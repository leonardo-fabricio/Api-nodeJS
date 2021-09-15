const multer = require('multer');

module.exports = (multer({
    storage: multer.diskStorage({
        destination: (req, res, cb) => {
            cb(null, './publico/img')
        },
        filename : (req, res, cb) => {
            cb(null, Date.now().toString + "_" + file.originalname)
        }
    }),
    fileFilter: (req, res, cb) => {
        const extensaoImg = ['image/png', 'image/jpeg', 'image/jpg'].find
        (formatoAceito => formatoAceito == file.mimetype);
        if(extensaoImg){
            return cb(null,true);
        }
        return cb(null, false)
    }
}))