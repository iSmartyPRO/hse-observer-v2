module.exports.index = (req, res) => {
    res.status(200).json({
        message: req.t('test')
    })
}