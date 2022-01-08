const bcrypt = require("bcrypt")
const Model = require("../models/user")
const fs = require('fs')
const path = require('path')
const imgSaver = require('../helpers/img-saver')
const user = require('../models/user')
const jwt = require("jsonwebtoken")

// Получение профиля пользователя
module.exports.get = (req, res, next) => {
  let id = res.userData.uId
  try {
    Model.findById(id)
      .select("_id name email branch department position authType roles language avatar")
      .populate("branches", "name")
      .populate("department", "name")
      .populate("roles", "name description")
      .exec()
      .then((data) => {
        if (data) {
          Object.assign(data, {tokenExpiration: jwt.decode(req.headers.authorization.split(" ")[1])})
          res.status(200).json({ message: req.t('getDataById', { id }), data })
        } else {
          res.status(404).json({ message: req.t('error.dataNotFoundById', { id }) })
        }
      })
      .catch(err => console.log(err))
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: req.t('error.catchBlock'), error })
  }
}

// Обновление информации о пользователе
module.exports.update = async (req, res, next) => {
  let id = res.userData.uId
  let checkUser = await Model.findById(id).lean()
  if (checkUser) {
    if (req.body.password) {
      await Model.findByIdAndUpdate(id, { password: bcrypt.hashSync(req.body.password, 10) })
      res.status(200).json({ message: req.t('user.passwordUpdated', { name: checkUser.name }) })
    } else if (req.body.language) {
      await Model.findByIdAndUpdate(id, { language: req.body.language })
      res.status(200).json({ message: req.t('user.languageUpdated') })
    } else {
    res.status(200).json({ message: req.t('nothingUpdates') })
  }

} else {
  res.status(404).json({ message: req.t('error.dataNotFoundById', { id }) })
}
}
