const AD = require('activedirectory2').promiseWrapper
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/user")
const config = require("../config")
const moment = require("moment")

const getToken = (uId, roles) => {
  return jwt.sign(
    {
      uId,
      roles
    },
    config.secretJWTToken,
    {
      expiresIn: config.tokenLiveTime
    }
  )
}

module.exports.login = async (req, res, next) => {
  let { username, password } = req.body
  if (username && password) {
    // Проверка если username и password были предоставлены
    let checkUser = await User.findOne({ username }).populate("roles", "name")
    if (checkUser) {
      let roles = checkUser.roles.map(item => { return item.name })
      let language = checkUser.language ? checkUser.language : "ru"
      roles.length ? roles : roles = ["standard"] // если roles не существует то назначить роль standard
      if (checkUser.authType === 'ad') {
        // если authType является Active Directory то тогда выполнить авторизоваться через Active Directory
        const ad = new AD(config.activeDirectory)
        ad.authenticate(`${username}@${config.domainPostFix}`, password, async function (err, auth) {
          if (err) {
            console.log('ERROR: ' + JSON.stringify(err))
          }
          if (auth) {
            let token = getToken(checkUser._id, roles)
            checkUser.tokens.push(token)
            await User.findByIdAndUpdate(checkUser._id, { tokens: checkUser.tokens })
            console.log(req.t('auth.info', { name: checkUser.name, expired: moment(jwt.decode(token).exp * 1000).format('LLLL')}))
            res.status(200).json({ message: req.t('auth.adSuccess'), uid: checkUser._id, token, language })
          }
          else {
            res.status(401).json({ message: req.t('auth.adFailed'), error: err })
          }
        })
      } else {
        // if authtype is other, assuming by default is local - then check by local password variables
        bcrypt.compare(password, checkUser.password, async (err, checkPassword) => {
          if (err) {
            res.status(500).json({ message: req.t('auth.errorCheckingPassword'), error: err })
          } else {
            if (checkPassword) {
              let token = getToken(checkUser._id, roles)
              checkUser.tokens.push(token)
              await User.findByIdAndUpdate(checkUser._id, { tokens: checkUser.tokens })
              console.log(req.t('auth.info', { name: checkUser.name, expired: moment(jwt.decode(token).exp * 1000).format()}))
              res.status(200).json({ message: req.t('auth.authrozied'), uid: checkUser._id, token, language })
            } else {
              res.status(401).json({ message: req.t('auth.failed') })
            }
          }
        })
      }
    } else {
      res.status(401).json({ message: req.t('auth.failed') })
    }
  } else {
    res.status(500).json({ message: req.t('auth.missingRequiredValues') })
  }
}

module.exports.signup = (req, res, next) => {
  res.status(200).json({ message: req.t('singUp.underConstruction') })
}

module.exports.logout = async (req, res, next) => {
  let checkUser = await User.findById(res.userData.uId).lean()
  if (checkUser) {
    let token = req.headers.authorization.split(" ")[1]
    console.log(req.t('logout.tokenForRemove', {token}))
    try {
      let signOut = await User.findByIdAndUpdate(checkUser._id, { tokens: checkUser.tokens.filter(item => item !== token) })
      res.status(200).json({ message: req.t('logout.signedOut') })
    } catch (err) {
      console.log(err)
    }

  } else {
    res.status(404).json({ message: req.t('userNotFound') })
  }

}