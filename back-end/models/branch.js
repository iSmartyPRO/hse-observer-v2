const mongoose = require("mongoose")

const branchSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    location: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    observerNotificationUsers: {
      type: Array
    }
  },
  {
    timestamps: true
  })

module.exports = mongoose.model('Branch', branchSchema)