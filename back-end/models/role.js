const mongoose = require("mongoose")

const roleSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    displayName: String,
    description: String
  },
  { timestamps: true }
)

module.exports = mongoose.model("Role", roleSchema)