const mongoose = require("mongoose")

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    name: String,
    email: {
      type: String,
      required: true,
      unique: true,
      match: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

    },
    authType: {
      type: String,
      required: true,
      default: 'local'
    },
    password: {
      type: String,
      required: true
    },
    plainTextPassword: String,
    position: String,
    branches: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Branch'
    }],
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department'
    },
    avatar: String,
    roles: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role'
    }],
    language: {
      type: String,
      required: true,
      default: 'ru'
    },
    tokens: Array
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model("User", userSchema)