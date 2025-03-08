import multer from "multer";
const uploadPath = "/var/www/html/tuition/recording-upload-data";
const storage = multer.diskStorage({
    //Specify the destination directory where the file needs to be saved
    destination: function (req, file, cb) {
        cb(null, uploadPath)
    },
    //Specify the name of the file. The date is prefixed to avoid overwriting of files.
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    },
})

const upload = multer({
    storage: storage,
})

export default upload;