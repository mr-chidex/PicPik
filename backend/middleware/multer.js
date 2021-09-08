const multer = require("multer");

const imageFilter = (req, file, cb)  => {
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg") {
        cb(null, true)
    }else{
        cb(null, false)
    }
}

const imageStorage = multer.diskStorage({})

module.exports = multer({
    storage: imageStorage,
    fileFilter: imageFilter,
    limits: {fileSize: 500000}
})