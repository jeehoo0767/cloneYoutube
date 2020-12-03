const express = require('express');
const router = express.Router();
const { Video } = require('../models/Video');
const multer = require('multer');
const { auth } = require('../middleware/auth');
const { Subscriber } = require('../models/Subscriber')
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



router.get('/getVideos', (req, res) => {
   Video.find()
   .populate('writer')
   .exec((err, videos) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({ success : true , videos})
   })
})

router.post('/uploadfiles', (req, res) => {
    // 비디오를 서버에 저장.
    upload(req, res, err => {
        if(err) {
            return res.json({success : false, err});
        }
        return res.json({ success : true, url : res.req.file.path, fileName : res.req.file.filename})
    })
    
})

router.post('/getVideoDetail', (req, res) => {
    Video.findOne({ "_id" : req.body.videoId})
        .populate('writer')
        .exec((err, videoDetail) => {
            if(err) return res.status(400).send(err)
            return res.status(200).json({ success : true, videoDetail});
        })
})

router.post('/uploadVideo', (req, res) => {
    //비디오 정보 저장
    console.log("비디오 업로드 요청")
    const video = new Video(req.body);
    console.log(video);
    video.save((err, doc) => {
        if(err) return res.json({ success : false, err})
        res.status(200).json({ success : true})
    });
})

router.post("/thumbnail", (req, res) => {

    let thumbsFilePath ="";
    let fileDuration ="";

    ffmpeg.ffprobe(req.body.url , function(err, metadata){
        console.dir('maeadata : ' + metadata);
        console.log(metadata.format.duration);

        fileDuration = metadata.format.duration;
    })


    ffmpeg(req.body.url)
        .on('filenames', function (filenames) {
            console.log('Will generate ' + filenames.join(', '))
            thumbsFilePath = "uploads/thumbnails/" + filenames[0];
        })
        .on('end', function () {
            console.log('Screenshots taken');
            return res.json({ success: true, thumbsFilePath: thumbsFilePath, fileDuration: fileDuration})
        })
        .screenshots({
            // Will take screens at 20%, 40%, 60% and 80% of the video
            count: 3,
            folder: 'uploads/thumbnails',
            size:'320x240',
            // %b input basename ( filename w/o extension )
            filename:'thumbnail-%b.png'
        });

});

router.post('/getSubscriptionVideos', (req, res) => {
    //자신의 ID를 가지고 구독 하는 사람들을 찾는다.
    Subscriber.find({ 'userFrom' : req.body.userFrom })
    .exec(( err, subscriberInfo) => {
        if(err) return res.status(400).send(err);

        let subscribedUser = [];
        
        subscriberInfo.map((subscriber, i) => {
            subscribedUser.push(subscriber.userTo);
        })
    
    // 찾은 사람들으 비디오를 가져온다.
    
    Video.find({ writer : { $in : subscribedUser}})
    .populate('writer')
    .exec((err, videos) => {
        if(err) return res.status(400).send(err)
        res.status(200).json({ success : true, videos})
    })
})

});
module.exports = router;