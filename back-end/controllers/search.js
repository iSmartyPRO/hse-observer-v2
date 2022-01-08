const User        = require("../models/user")
const Branch      = require("../models/branch")
const Department  = require("../models/department")
const Role        = require("../models/role")


// Получение списка всех пользователей
module.exports.user = (req, res, next) => {
  let {s} = req.params
  try {
    let search = new RegExp(s, 'ig')
    User.find({$or: [{name: {$regex: search }}, {email: {$regex: search }}]})
      .select("_id name email")
      .exec()
      .then((data) => {
        if(data.length){
          res.status(200).json({ message: req.t('search.result', { search: s }), data })
        } else {
          res.status(404).json({message: req.t('search.notFoundSearch', {search: s})})
        }
      })
      .catch(err => res.status(500).json({message: err.message}))
  } catch (error) {
    res.status(500).json({ message: req.t('error.catchBlock'), error })
  }
}
