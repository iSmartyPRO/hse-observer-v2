const Model = require("../models/user")
const Branch = require("../models/branch")
const Department = require("../models/department")

module.exports.getAll = (req, res, next) => {
  try {
    Model.find()
      .select("_id name email")
      .exec()
      .then((data) => {
        res.status(200).json({message: "Get all data", data})
      })
      .catch(err => console.log(err))
  } catch(errorCatch) {
    console.log(errorCatch)
    res.status(500).json({message: "Error in catch block", errorCatch})
  }
}

module.exports.get = (req, res, next) => {
  let {id} = req.params
  try{
    Model.findById(id)
      .select("_id name email branch department position")
      .populate("branches", "name")
      .populate("department", "name")
      .exec()
      .then((data) => {
        res.status(200).json({message: `Getting data by id: ${id}`,data})
      })
      .catch(err => console.log(err))
  } catch(error){
    console.log(error)
    res.status(500).json({message:"Error in catch block", error})
  }
}
module.exports.save = async (req, res, next) => {
  let d = req.body
  let branchId = await Branch.findOne({name: d.branch},'_id')
  let departmentId = await Department.findOne({name: d.department}, '_id')
  await new Model({
    name: d.name,
    email: d.email,
    position: d.position,
    branches: branchId,
    department: departmentId
  }).save((err, data) => {
    if(err) console.log(err)
    res.status(201).json(
      {
        message: "Your data is saved!",
        data
      }
    )
  })
}
module.exports.update = (req, res, next) => {
  let {id} = req.params
  let {body} = req
  Model.findByIdAndUpdate(id, body, {new: true}, (err, data) => {
    if(err) console.log(err)
    if(data){
      res.status(200).json({
        message: `Your data is updated by id: ${id}`,
        data
      })
    } else {
      res.status(404).json({
        message: `Data for ID: ${id} is not found, can't be updated!`,
      })
    }
  })


}
module.exports.delete = (req, res, next) => {
  let {id} = req.params
  Model.findByIdAndDelete(id, (err, data) => {
    if(err) console.log(err)
    if(data){
      res.status(200).json({
        message: `Delete your data by id: ${id}`,
        data
      })
    } else {
      res.status(404).json({
        message: `Data for ID: ${id} is not found, can't be deleted!`,
      })
    }
  })
}
