export const controller = path => {
  return target => {
    target._prefix = path
  }
}

export const route = (path, method = 'get', middlewares = []) => {
  return (target, key, descriptor) => {
    let fn = descriptor.value
    
    if (typeof fn !== 'function') {
      throw new SyntaxError('@route can only be used on methods, not: ' + fn)
    }

    if (middlewares instanceof Function) {
      middlewares = [ middlewares ]
    }

    fn._route = { path, method }

    return {
      configurable: descriptor.configurable,
      enumerable: true,
      writabl: false,
      get () {
        return {
          config: { path, method },
          middlewares: middlewares,
          handler: fn.bind(this)
        }
      },
      set () {
        throw new SyntaxError('cannot assign new value to @route method')
      }
    }
  }
}
