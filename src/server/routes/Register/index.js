//! Reparar errores de eslint
const { doRequestRest } = require('../../utils/HTTPRequest')

const LOGGER = require('../../config/Logger').Logger
const CONFIG = require('../../config')

module.exports = router => {
  const { LOGGER_REQUEST } = CONFIG
  const SERVICE = CONFIG.SERVICE_INITIAL

  // eslint-disable-next-line consistent-return
  const serviceHandlerAdd = config => (req, res) => {
    const data = req.body

    if (Object.keys(data).length === 0) {
      LOGGER(
        'ERROR',
        `[User:${config.name}].ValidationError: Need idUser, token`,
        LOGGER_REQUEST
      )
      return res.status(500).send({
        codigoError: '500',
        descripcionError: 'ValidationError Need: idUser, token '
      })
      // eslint-disable-next-line no-else-return
    } else {
      return res.status(200).send({
        codigoError: 200,
        descripcionError: 'successful complete'
      })
    }
  }

  // eslint-disable-next-line consistent-return
  const serviceHandlerSet = (config, map) => (req, res) => {
    const data = req.body

    if (
      Object.keys(data).length === 0 ||
      (data.idUser === undefined || data.token === '')
    ) {
      LOGGER(
        'ERROR',
        `[${config.name}].ValidationError: Need idUser, token`,
        LOGGER_REQUEST
      )
      return res.status(500).send({
        codigoError: '500',
        descripcionError: 'ValidationError Need: idUser, token '
      })
      // eslint-disable-next-line no-else-return
    } else {
      const userId = data.idUser
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: 'example',
        idConsumidor: SERVICE.ID_CONSUMIDOR,
        idDestino: SERVICE.ID_DESTINO,
        usuario: data.idUser
      }

      const body = map ? map(data) : data

      LOGGER(
        'INFO',
        `[User:${userId}] ${config.name}.BODY: ${JSON.stringify(body)}`,
        LOGGER_REQUEST
      )
      doRequestRest(
        config.protocol,
        config.host,
        config.port,
        config.path,
        config.method,
        headers,
        body,
        response => {
          const responseJSON = JSON.parse(response)
          responseJSON.message = 'Operacion Exitosa'

          LOGGER(
            'INFO',
            `[User:${userId}] ${config.name}: Exitoso`,
            LOGGER_REQUEST
          )

          return res.status(200).send(responseJSON)
        },
        err => {
          LOGGER('ERROR', err, LOGGER_REQUEST)
          return res.status(500).send(JSON.parse(err))
          // eslint-disable-next-line prettier/prettier
        }
      )
    }
  }

  const addUserInfo = serviceHandlerAdd(
    {
      name: 'addUserInfo',
      protocol: '',
      host: '',
      port: '',
      path: '',
      method: ''
    },
    data => {
      const tmp = Object.assign({}, data)
      delete tmp.idUser
      delete tmp.token
      return tmp
    }
  )

  const setUserInfo = serviceHandlerSet(
    {
      name: 'setUserInfo',
      protocol: SERVICE.PROTOCOL,
      host: SERVICE.HOST,
      port: SERVICE.PORT,
      path: SERVICE.PATH,
      method: CONFIG.METHOD_POST
    },
    data => {
      const tmp = Object.assign({}, data)
      delete tmp.idUser
      delete tmp.token
      return tmp
    }
  )

  // Link routes and functions
  router.post('/addUserInfo', addUserInfo)
  router.post('/setUserInfo', setUserInfo)
}
