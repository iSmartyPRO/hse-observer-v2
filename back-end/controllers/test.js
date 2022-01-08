// Получение списка всех пользователей
const iutils = require("ismartypro-utils")


module.exports.getAll = async (req, res, next) => {
  try {
    let userIds = await iutils.checkDbIds({
      modelFile: 'user',
      ids: ['614f2952eb272800bb3aa3f7', '614f2952eb272800bb3aa3fz']
    })
    if(userIds.ok) {
      res.status(200).json({message: 'OK'})
    }
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}
