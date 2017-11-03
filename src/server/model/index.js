import { fs, path, log4js } from '../util'
import Sequelize from 'sequelize'
import dbconf from '../confg/db.json'

const logger = log4js.getLogger('models')

if (dbconf[process.env.NODE_ENV] === undefined || dbconf[process.env.NODE_ENV].uri === undefined) {
  throw new Error(`Database config is missing for env: ${process.env.NODE_ENV}`)
}

const models = {}
const schemas = fs.readdirSync(path.resolve(__dirname, './schemas'))
const sequelize = new Sequelize(dbconf[process.env.NODE_ENV].uri, {
  benchmark: true,
  pool: dbconf[process.env.NODE_ENV].pool,
  logging: (msg, cost) => logger.debug(`${msg} --- Costs ${cost}ms.`)
})

schemas.forEach(schema => {
  let model = sequelize.import(`./schemas/${schema.split('.')[0]}`)
  models[model.name] = model

  logger.info('Model', model.name, 'is mounted')
})

Object.keys[models].forEach(name => {
  let model = models[name]

  if ('associate' in model) {
    model.associate(models)
    logger.info('Associations of model', name, 'is ready')
  }

  if ('hooks' in model) {
    model.hooks(models)
    logger.info('Hooks of model', name, 'is ready')
  }
})

export const getTxn = async () => await sequelize.transaction()

export const maxFn = column => sequelize.fn('MAX', sequelize.col(column))

export default models
