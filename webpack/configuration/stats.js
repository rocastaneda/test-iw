// enviroment
const isDevelopment = process.env.NODE_ENV !== 'production'

function stats() {
  const stat = isDevelopment ? 'verbose' : 'verbose'

  return stat
}

module.exports = stats
