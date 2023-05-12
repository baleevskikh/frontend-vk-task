const Router = require('express')
const router = new Router()
const fs = require("fs");
const multer = require('multer')

const upload = multer({dest: 'images/'})

router.post('/images', upload.single('image'), (req, res) => {
    const imageName = req.file.filename
    return res.json({imageName})
})

router.get('/images/:imageName', (req, res) => {
    const {imageName} = req.params
    const readStream = fs.createReadStream(`images/${imageName}`)
    readStream.pipe(res)
})

module.exports = router