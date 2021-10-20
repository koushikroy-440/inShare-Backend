const express = require('express');
const router = express.Router();
const File = require('../modal/file.modal');

router.get('/:uuid', async (req, res) => {
    try {
        const file = await File.findOnce({ uuid: req.params.uuid });
        if (!file) {
            return res.render('download', { error: 'Link has been expired. ' });
        }
        return res.render('download', {
            uuid: file.uuid,
            fileName: file.fileName,
            fileSize: file.size,
            downloadLink: `${process.env.APP_BASE_URL}/files/download/${file.uuid}`
        });
    } catch (err) {
        return res.render('download', { error: err });
    }
});


module.exports = router;