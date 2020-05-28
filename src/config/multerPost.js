const multer = require(`multer`);
const path = require(`path`);
const crypto = require(`crypto`);
const aws = require(`aws-sdk`);
const multerS3 = require(`multer-s3`);
require(`dotenv/config`);

const s3 = multerS3({
    s3: new aws.S3(),
    bucket: process.env.AWS_BUCKET_NAME_POST,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: `public-read`,
    key: (req, file, cb) => {
        crypto.randomBytes(16, (err, hash) => {
            if (err) cb(err);

            const fileName = `${hash.toString(`hex`)}-${file.originalname}`;

            cb(null, fileName);
        })
    }
})


module.exports = {
    dest: path.resolve(__dirname, `..`, `..`, `tmp`, `uploads`),
    storage: s3,
    limits: {
        fileSize: 2 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            `image/jpeg`,
            `image/pjpeg`,
            `image/png`,
            `image/gif`
        ];

        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error(`tipo de arquivo invalido!`));
        }

    }
};