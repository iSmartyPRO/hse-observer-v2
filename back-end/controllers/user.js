const bcrypt = require("bcrypt")
const { checkDbIds } = require('ismartypro-utils')
const fs = require('fs')
const path = require('path')
const Model = require("../models/user")
const imgSaver = require('../helpers/img-saver')

const { validationResult } = require('express-validator')
const { error } = require('console')



// Получение списка всех пользователей
module.exports.getAll = (req, res, next) => {
  try {
    Model.find()
      .select("_id name username email position avatar")
      .exec()
      .then((data) => {
        res.status(200).json({ message: req.t('getAllData'), data })
      })
      .catch(error => res.status(500).json({ message: req.t('error.catchBlock'), error }))
  } catch (error) {
    res.status(500).json({ message: req.t('error.catchBlock'), error })
  }
}

// Получение информации о пользователи по ID
module.exports.get = (req, res, next) => {
  let { id } = req.params
  try {
    Model.findById(id)
      .select("_id name username email branches department roles position authType roles language avatar")
      /*
      решил не использовать populate, потому как оказалось оно лишнее
      позже надо будет стереть эти строки
      .populate("branches", "name")
      .populate("department", "name")
      .populate("roles", "name description")
      */
      .exec()
      .then((data) => {
        if (data) {
          res.status(200).json({ message: req.t('getDataById', { id }), data })
        } else {
          res.status(404).json({ message: req.t('error.dataNotFoundById', { id }) })
        }
      })
      .catch(error => res.status(500).json({ message: req.t('error.catchBlock'), error }))
  } catch (error) {
    res.status(500).json({ message: req.t('error.catchBlock'), error })
  }
}

// Создание пользователя в системе
module.exports.save = async (req, res, next) => {
  let d = req.body
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(422).json({ message: req.t('validation.error'), errors: errors.array().map(({ location, ...error }) => error) })
  } else {
    try {
      let checkUser = await Model.findOne({ username: d.username })
      if (!checkUser) {
        // если пользователя нет с таким e-mail продолжаем создавать
        // с использованием промисов выполянется ряд проверок: правильность IDs и существование записи в базе данных
        // если же будет ошибка то они будут выловлены в блоке catch
        d.branches ? await checkDbIds({ modelFile: 'branch', ids: d.branches, locale: req.language }) : null
        d.department ? await checkDbIds({ modelFile: 'department', ids: [d.department], locale: req.language }) : null
        d.roles ? await checkDbIds({ modelFile: 'role', ids: d.roles, locale: req.language }) : null
        const hashedPassword = await bcrypt.hashSync(d.password, 10)
        const newUser = {
          name: d.name,
          username: d.username,
          email: d.email,
          password: hashedPassword,
          position: d.position,
          branches: d.branches,
          department: d.department,
          roles: d.roles,
          language: d.language
        }
        if (d.avatar) {
          newUser.avatar = await imgSaver(d.avatar, `avatar`)
        }

        let user = new Model(newUser)
        user.save()
          .then(data => {
            res.status(201).json(
              {
                message: req.t('user.created', { name: data.name }),
                data
              }
            )
          })
          .catch(error => {
            res.status(500).json({ message: req.t('error.catchBlock'), error: error })
          })
      } else {
        res.status(409).json({ message: req.t('user.alreadyExistByEmail', { email: d.email }) })
      }

    } catch (err) {
      res.status(500).json({ message: req.t('error.catchBlock'), errors: err.errors })
    }
  }
}


// Обновление информации о пользователе
module.exports.update = async (req, res, next) => {
  let { id } = req.params
  try {
    let checkUser = await Model.findById(id).lean()
    delete checkUser.password
    if (checkUser) {
      let { body } = req
      if (body.avatarRemove) {
        // если в запросе имеется removeAvatar - выполняется только процесс удаления аватара
        if (checkUser.avatar) {
          await fs.unlinkSync(path.join(__dirname, '..', 'uploads', checkUser.avatar))
          await Model.findByIdAndUpdate(id, { avatar: null })
          res.status(200).json({ message: req.t('avatar.removed') })
        } else {
          res.status(404).json({ message: req.t('avatar.notFound') })
        }
      } else {
        // если в запросе нет removeAvatar - то выполняется все остальное
        body.branches ? await checkDbIds({ modelFile: 'branch', ids: body.branches }) : null
        body.department ? await checkDbIds({ modelFile: 'department', ids: [body.department] }) : null
        body.roles ? await checkDbIds({ modelFile: 'role', ids: body.roles }) : null

        if (body.password) {
          body.password = await bcrypt.hashSync(body.password, 10)
        }
        if (body.avatar) {
          body.avatar = await imgSaver(body.avatar, `avatar`)
        }
        // Процесс обновления
        Model.findByIdAndUpdate(id, body, { new: true }, (err, data) => {
          if (err) res.status(500).json({ message: err.message })
          if (data) {
            console.log(data)
            res.status(200).json({
              message: req.t('updatedById', { name: data.name })
            })
          } else {
            res.status(404).json({
              message: req.t('error.dataNotFoundById', { id }),
            })
          }
        })
      }
    } else {
      res.status(404).json({ message: req.t('error.notFound') })
    }
  } catch (error) {
    res.status(500).json({ message: req.t('error.catchBlock'), error })
  }


}

// Удаление пользователя из системы
module.exports.delete = (req, res, next) => {
  let { id } = req.params
  Model.findByIdAndDelete(id, (error, data) => {
    if (error) res.status(500).json({ message: "Database error", error })
    if (data) {
      res.status(200).json({
        message: req.t('user.deleted', { name: data.name }),
        data
      })
    } else {
      res.status(404).json({
        message: `Data for ID: ${id} is not found, can't be deleted!`,
      })
    }
  })
}
