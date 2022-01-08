const express = require("express")

const config = require("./config")
const app = require("./app")
const cleanToken = require("./helpers/clear-token")
const port = process.env.PORT || config.APP_PORT
process.env.TZ = config.timeZone

cleanToken()
app.listen(port, () => { console.log(`Server is running - ${config.APP_URL}:${port}/api`)})