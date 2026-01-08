const multer = require('multer')
const path = require('path')

// multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/assets/uploads'))
    },

    filename: (req, file, cb) => {
        let filename = Date.now().toString() + path.extname(file.originalname)
        cb(null, filename)
    }
})

const upload = multer({ storage })

module.exports = upload