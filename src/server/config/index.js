//! Reparar errores de eslint
const [PROTOCOL, HOST, PORT] = process.env.BACKEND_CAT.split('#')

module.exports = {
  LEVEL_LOG:
    process.env.LEVEL_LOG === undefined ? 'TRACE' : process.env.LEVEL_LOG,

  STATE_ACTIVO: 1,

  // eslint-disable-next-line no-array-constructor
  CATEGORIES: new Array('App', 'Utils.HTTPRequest'),

  LOGGER_DEFAULT: 0,
  LOGGER_REQUEST: 1,

  PROTOCOL,
  HOST,
  PORT,

  METHOD_POST: 'POST',
  METHOD_GET: 'GET',
  METHOD_PUT: 'PUT',
  METHOD_DELETE: 'DELETE',

  SERVICE_INITIAL: {
    ID_CONSUMIDOR: '25',
    ID_DESTINO: '14',
    PROTOCOL,
    HOST,
    PORT,
    PATH: '/api/addUserInfo'
  }
}
