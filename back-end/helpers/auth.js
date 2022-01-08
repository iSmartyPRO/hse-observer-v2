const jwt = require("jsonwebtoken")
const User = require("../models/user")
const {secretJWTToken} = require("../config")

module.exports.authCheck = async (req, res, next) => {
  try {
    if(req.headers.authorization){
      let token = req.headers.authorization.split(" ")[1]
      let decoded = jwt.verify(token, secretJWTToken)
      res.userData = decoded
      let user = await User.findById(decoded.uId)
      let tokenExist = user.tokens.find(item => item === token)
      if(tokenExist) {
        next()
      } else {
        console.log(req.t('tokenNotFoundInDatabase'))
        res.status(401).json({message: req.t('auth.failed')})
      }
    } else {
      return res.status(401).json({message: req.t('auth.failed')} )
    }
  } catch (err) {
    console.log({message: err.message})
    res.status(401).json({message: req.t('auth.failed')} )
  }
}

module.exports.grantAccess = function(roles) {
  return async (req, res, next) => {
    if(roles instanceof Array) {
      try {
        if(roles.filter(value => (res.userData.roles.map(item => item.toLowerCase())).includes(value)).length ? true : false){
          next()
        } else {
          res.status(403).json({message: req.t('accessForResourceForbidden')})
        }
      } catch (err) {
        next(err)
      }
    } else {
      console.log(req.t('auth.roleIsNotArray'))
      res.status(500).json({message: req.t('auth.failed')})
    }

  }
}