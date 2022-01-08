const Model = require("../models/branch")
const User = require("../models/user")

module.exports.getAll = (req, res, next) => {
  try {
    Model.find()
      .select("_id name location")
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
      .select("_id name location")
      .exec()
      .then((data) => {
        if(data){
          res.status(200).json({message: req.t('getDataById', {id}), data})
        } else {
          res.status(404).json({message: req.t('error.dataNotFoundById', {id})})
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
    if(err) res.status(500).json({message: err.message})
    res.status(201).json(
      {
        message: req.t('branch.created', { name: data.name }),
        data
      }
    )
  })
}
module.exports.update = (req, res, next) => {
  let {id} = req.params
  let {body} = req
  Model.findByIdAndUpdate(id, body, {new: true}, (err, data) => {
    if(err) res.status(500).json({message: err.message})
    if(data){
      res.status(200).json({
        message: req.t('updatedById', {id}),
        data
      })
    } else {
      res.status(404).json({
        message: req.t('error.notFoundNotUpdated', {id}),
      })
    }
  })


}
module.exports.delete = async (req, res, next) => {
  let {id} = req.params
  let checkDependency = await User.find({branches: id})
  if(!checkDependency.length) {
    Model.findByIdAndDelete(id, (err, data) => {
      if(err) res.status(500).json({message: err.message})
      if(data){
        res.status(200).json({
          message: req.t('branch.deleted', {name: data.name})
        })
      } else {
        res.status(404).json({
          message: req.t('error.dataNotFoundById'),
        })
      }
    })
  } else {
    res.status(409).json({
      message: req.t('error.dependencyExist'),
      dependencies: checkDependency.map(item => {return item.name})
    })
  }
/*    */
}
