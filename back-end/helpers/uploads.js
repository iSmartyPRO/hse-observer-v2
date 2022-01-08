const multer = require("multer")
const moment = require("moment")
const path = require("path")



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const extension = file.originalname.split(".")[file.originalname.split(".").length - 1]
    const uniqueSuffix = moment().format("YYYY-MM-DD_HHmmss") + '-' + Math.round(Math.random() * 1E9)
    cb(null, `${file.fieldname}-${uniqueSuffix}.${extension}`)
  }
})

const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif/;
  const mimetype = fileTypes.test(file.mimetype);
  const extname = fileTypes.test(path.extname(file.originalname));
  if (mimetype && extname) {
    return cb(null, true);
  }
  cb("Error: its not image, only image acceptable");
}

const limits = {fileSize: '10000000'}

const onError = function(err, next) {
  console.log('error', err);
  next(err);
}

const uploads = multer({ storage, limits, fileFilter  })

module.exports = {uploads}