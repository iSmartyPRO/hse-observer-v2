const uniqueId = require('./uniqueId')
const path = require('path')
const fs = require('fs')

module.exports = async (encodedImage, filename = "file") => {
  var base64Data = encodedImage.replace(/^data:image\/png;base64,/, "");
  const saveFilename = `${filename}_${uniqueId()}.png`
  const outFile = path.join(__dirname, '..', 'uploads', saveFilename)
  await fs.promises.writeFile(outFile, base64Data, 'base64');
  return saveFilename
}