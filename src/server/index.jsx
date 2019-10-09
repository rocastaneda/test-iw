//! Reparar errores de eslint Dependencies
import express from 'express'
import open from 'open'
import path from 'path'
import fs from 'fs'
import cors from 'cors'
import bodyParser from 'body-parser'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackHotServerMiddleware from 'webpack-hot-server-middleware'
// Utils
import { isMobile, isBot } from '../shared/utils/device'
// webpack config
import webpackConfig from '../../webpack.config'
// Client Render
import clientRender from './render/clientRender'
// Environment
const isProduction = process.env.NODE_ENV === 'production'
// Analyzer
const isAnalyzer = process.env.ANALYZER === 'true'
// express App
const app = express()
// Webpack Compiler
const compiler = webpack(webpackConfig)
// server
const server = require('http').createServer(app)
// LOGGER
const LOGGER = require('./config/Logger').Logger
// Port listen
const port = process.env.NODE_PORT || 8080

// GZip Compression just for Production
if (isProduction) {
  app.get('*.js', (req, res, next) => {
    req.url = `${req.url}.gz`
    res.set('Content-Encoding', 'gzip')
    /* req.url = `${req.url}.br`
    res.set('Content-Encoding', 'br') */
    next()
  })
}

const routerApi = express.Router()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

// public static
app.use(express.static(path.join(__dirname, '../../public')))

app.use('/api', routerApi)

// eslint-disable-next-line consistent-return
routerApi.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, Bpm, Uid'
  )

  if (req.method !== 'OPTIONS') {
    if (req.get('authorization')) {
      req.body.token = req.get('authorization')
      // req.body.bpm_token = req.get('bpm')
      req.body.idUser = req.get('uid')
      next()
    } else {
      return res.status(403).send({
        codigoError: 403,
        descripcionError: 'No Authorization provided.'
      })
    }
  } else {
    next() // make sure we go to the next routes and don"t stop here
  }
})

fs.readdirSync(path.join(__dirname, '.', 'routes/Register/')).forEach(file => {
  require(`./routes/Register/${file}`)(routerApi) // eslint-disable-line
})

// Device Detection
app.use((req, res, next) => {
  req.isMobile = isMobile(req.headers['user-agent'])
  // We detect if a search bot is accessing...
  req.isBot = isBot(req.headers['user-agent'])
  next()
})

if (!isProduction) {
  // hot middleware replacement
  app.use(webpackDevMiddleware(compiler))
  app.use(webpackHotMiddleware(compiler.compilers.find(compiler => compiler.name === 'client'))) // eslint-disable-line
}

// Client Side Rendering
app.use(clientRender())

if (isProduction) {
  try {
    // eslint-disable-next-line
    const serverRender = require('../../dist/app/server.js').default

    app.use(serverRender())
  } catch (e) {
    throw e
  }
}

// For Server Side Rendering on Development Mode
app.use(webpackHotServerMiddleware(compiler))

// Disabling x-powered-by
app.disable('x-powered-by')

// listening port
server.listen(port, err => {
  if (!err || isAnalyzer) {
    open(`http://localhost:${port}`)
    LOGGER('INFO', `React App listening on ${port}`)
  }
})
