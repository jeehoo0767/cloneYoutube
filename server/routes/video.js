const express = require('express');
const router = express.Router();
// const { Video } = require('../models/Video');
const multer = require('multer');
const { auth } = require('../middleware/auth');
const ffmpeg = require('fluent-ffmpeg');

let storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename : (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter : (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if(ext !=='.mp4') {
            return cb(res.status(400).end('only mp4 is allowed'), false);
        }
        cb(null, true);
    }
});

const upload = multer({ storage : storage }).single("file");


router.post('/uploadfiles', (req, res) => {
    // 비디오를 서버에 저장.
    upload(req, res, err => {
        if(err) {
            return res.json({success : false, err});
        }
        return res.json({ success : true, url : res.req.file.path, fileName : res.req.file.filename})
    })
    
})

router.post('/thumbnail', (req, res) => {
  
    // 썸네일 생성 - 비디오 러닝타임 가져오기
    ffmpeg()
})

module.exports = router;