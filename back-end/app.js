const express = require("express")
const morgan = require("morgan")
const mongoose = require("mongoose")
const path = require("path")
const {I18n} = require("i18n")

const config = require("./config")
const apiRoutes = require("./routes/api")

const errorHandler = require("./helpers/errorHandler")
const corsHandler = require("./helpers/corsHandler")

// HELPERS
const {authCheck}           = require('./helpers/auth')

// Locales i18n
const i18n = new I18n()
i18n.configure({
  locales: ['ru', 'en', 'tr'],
  fallbackLanguage: 'ru',
  fallbacks: {
    'en-*': 'en',
    'tr-*': 'tr',
  },
  defaultLocale: 'ru',
  directory: path.join(__dirname, 'locales'),
  header: 'accept-language',
  api: {
    __: 't', // now req.__ becomes req.t
    __n: 'tn' // and req.__n can be called as req.tn
  },
})


const app = express()
app.use(corsHandler)

mongoose.connect(config.MongoDBUri)

app.use(express.urlencoded({limit: '50mb', extended: true}))
app.use(express.json({limit: '50mb'}))
app.use('/uploads', express.static('uploads'))
app.use(morgan('combined'))

app.use(i18n.init)

app.set('etag', false)

// API Route
app.use("/api/", apiRoutes)

// Error Handlers
app.use(errorHandler.defaultError)
app.use(errorHandler.customError)

module.exports = app