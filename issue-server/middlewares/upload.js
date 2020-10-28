const multer = require('multer');
const path = require('path');

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'support/screenshots/');
    },
    filename: (req, file, cb) => {
        console.log('reporterName =====>', req);
        const ext = file.mimetype.split('/')[1];
        const filename = `${Date.now()}.${ext}`;
        req.uploadedImageName = filename;
        cb(null, filename);
    }
});

const multerFilter = (req, file, cb) => {
    const allowedFiletypes = /jpeg|jpg|png|gif/;
    const isAllowedFiletype = allowedFiletypes.test(path.extname(file.originalname).toLowerCase());
    const isAllowedMimeType = allowedFiletypes.test(file.mimetype);
        
    if (isAllowedMimeType && isAllowedFiletype) {
        return cb(null, true);
    } else {
        cb('not an image', false);
    }

};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
}).single('image');

const uploadIssueScreenshot =  (req, res, next) => {
    upload(req, res, (err) => {
        if(err) {
            res.status(400).send(err.message ? err.message : err);
            return;
        }
        next();
    });
};

module.exports = {
    upload,
    uploadIssueScreenshot
}
