import glob from 'glob'
import path from 'path'

// Load module from file.
const loadFileModule = (fileModule, modules = []) => {
  if (fileModule instanceof Function) {
    modules.push(fileModule)
  } else if (fileModule instanceof Array) {
    fileModule.forEach(module => loadFileModule(module, modules))
  } else if (fileModule instanceof Object || typeof fileModule === 'object') {
    Object.keys(fileModule).forEach(key => loadFileModule(fileModule[key], modules))
  }

  return modules
}

// import modules from file.
const importModules = directory => {
  const files = glob.sync(path.normalize(directory))
  const fileModules = files.filter(f => f.substring(f.length - 3, f.length) === '.js').map(f => require(f))

  return loadFileModule(fileModules)
}

export default {
  // load modules from definitions
  loadModules: definitions => {
    const collection = []

    if (definitions === null || !(definitions instanceof Array)) {
      return collection
    }

    definitions.forEach(definition => {
      if (definition instanceof Function) {
        collection.push(definition)
      } else if (typeof definition === 'string') {
        collection.push(...importModules(definition))
      }
    })

    return collection
  }
}