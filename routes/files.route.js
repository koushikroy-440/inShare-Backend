const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    //* validate request
    if (!req.file) {
        return res.json({ error: 'All fields are required. ' });
    }

    //* Store file


    //* Store into database


    //*Response -> Link

});

module.exports = router;