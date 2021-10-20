const express = require('express');
const router = express.Router();
const File = require('../modal/file.modal');


router.get('/:uuid', async (req, res) => {
    const uuid = req.params.uuid;
    const file = await File.findOne({ uuid: uuid });
    if (!file) {
        return res.render('download', { error: 'Link has been expired' });
    }

    const filePath = `${__dirname}/../${file.path}`;
    res.download(filePath);
});

module.exports = router;