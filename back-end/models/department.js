const mongoose = require("mongoose")

const departmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    description: String
  },
  {
    timestamps: true
  }
)
module.exports = mongoose.model("Department", departmentSchema)