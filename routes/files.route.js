const express = require('express');
const router = express.Router();
const path = require('path');
const File = require('../modal/file.modal');
const multer = require('multer');
const { v4: uuid4 } = require('uuid');


let storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

let upload = multer({
    storage,
    limit: { fileSize: 1000000 * 100 },
}).single('myfile');

router.post('/', (req, res) => {
    //* Store file
    upload(req, res, async (err) => {
        //* validate request
        if (!req.file) {
            return res.json({ error: 'All fields are required. ' });
        }

        if (err) {
            return res.status(500).send({ error: err.message });
        }
        //* Store into database
        const file = new File({
            filename: req.file.filename,
            uuid: uuid4(),
            path: req.file.path,
            size: req.file.size
        });

        const response = await file.save();
        return res.json({ file: `${process.env.APP_BASE_URL}/files/${response.uuid}` });
        /**
         * * prepare download linker
         * ! it's look like this: http://localhost:3000/files/236416defgdv1s69w4g6sv1
         */
    });



    //*Response -> Link

});

module.exports = router;