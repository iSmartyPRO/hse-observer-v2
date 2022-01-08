const cron = require("node-cron")
const cronstrue = require("cronstrue/i18n")
const moment = require("moment")
const jwt = require("jsonwebtoken")
const User = require("../models/user")
const config = require("../config")

module.exports = () => {
  console.log(`Clearing tokens is running - ${(cronstrue.toString(config.clearTokenCronJob, {locale: "ru"})).toLowerCase()}`)

  cron.schedule(config.clearTokenCronJob, async () => {
    try {
      let users = await User.find({ tokens: { $exists: true, $ne: [] } })
      if(users.length){
      users.forEach(user => {
        user.tokens.forEach(async (token) => {
          let tokenData = jwt.decode(token)
          let tokenExp = moment(tokenData.exp * 1000).format()
          let now = moment().format()
          if (tokenExp < now) {
            console.log(`Token for "${user.name}" is expired. Expiration date: ${tokenExp}`)
            await User.findByIdAndUpdate(user._id, { tokens: user.tokens.filter(item => item != token) })
          } else {
            //console.log(`No expired token`)
          }
        })
      })
    }
    } catch (err) {
      console.log(err)
    }
  })
}