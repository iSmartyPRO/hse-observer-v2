const Model = require("../models/role")
const User = require("../models/user")

module.exports.getAll = (req, res, next) => {
  try {
    Model.find()
      .select("_id name displayName description")
      .exec()
      .then((data) => {
        res.status(200).json({message: req.t('getAllData'), data})
      })
      .catch(err => console.log(err))
  } catch(errorCatch) {
    console.log(errorCatch)
    res.status(500).json({message: req.t('error.catchBlock'), errorCatch})
  }
}

module.exports.get = (req, res, next) => {
  let {id} = req.params
  try{
    Model.findById(id)
      .select("_id name displayName description")
      .exec()
      .then((data) => {
        if(data){
          res.status(200).json({message: req.t('getDataById', { id }), data})
        } else {
          res.status(404).json({message: req.t('error.dataNotFoundById', { id })})
        }
      })
      .catch(err => console.log(err))
  } catch(error){
    console.log(error)
    res.status(500).json({message: req.t('error.catchBlock'), error})
  }
}

module.exports.save = async (req, res, next) => {
  let d = req.body
  await new Model(d).save((err, data) => {
    if(err) console.log(err)
    res.status(201).json(
      {
        message: req.t('role.created', { name: data.name }),
        data
      }
    )
  })
}
module.exports.update = (req, res, next) => {
  let {id} = req.params
  let roleUpdate = {
    displayName: req.body.displayName,
    description: req.body.description
  }

  Model.findByIdAndUpdate(id, roleUpdate, {new: true}, (err, data) => {
    if(err) console.log(err)
    if(data){
      res.status(200).json({
        message: req.t('updatedById', { name: data.displayName }),
        data
      })
    } else {
      res.status(404).json({
        message: req.t('error.dataNotFoundById'),
      })
    }
  })


}
module.exports.delete = async (req, res, next) => {
  res.status(405).json({
    message: req.t('error.deleteNotAllowed')
  })
}
