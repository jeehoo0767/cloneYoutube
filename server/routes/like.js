const express = require('express');
const router = express.Router();
const { Like } = require('../models/Like');
const { DisLike } = require('../models/DisLike');

router.post('/getLikes', (req, res) => {
    let variable ={}
    if(req.body.videoId) {
        variable={
            videoId : req.body.videoId,
            userId : req.body.userId
        }
    } else {
        variable = {
            commentId : req.body.commentId,
            userId : req.body.userId
        }
    }
    Like.find(variable)
    .exec((err, likes) => {
        if(err) return res.status(400).send(err)
        res.status(200).json({ success : true, likes})
    })
})


router.post('/getDisLikes', (req, res) => {
    let variable ={}
    if(req.body.videoId) {
        variable={
            videoId : req.body.videoId,
            userId : req.body.userId
        }
    } else {
        variable = {
            commentId : req.body.commentId,
            userId : req.body.userId
        }
    }
    DisLike.find(variable)
    .exec((err, dislikes) => {
        if(err) return res.status(400).send(err)
        res.status(200).json({ success : true, dislikes})
    })
})

router.post('/upLike', (req, res) => {
    let variable ={}
    if(req.body.videoId) {
        variable={
            videoId : req.body.videoId,
            userId : req.body.userId
        }
    } else {
        variable = {
            commentId : req.body.commentId,
            userId : req.body.userId
        }
    }
    // like collection에 클릭 정보를 넣음
    const like = new Like(variable);

    like.save((err, likeResult) => {
        if(err) return res.json({ success : false, err})
        // 만약 싫어요가 이미 클릭 되어 있다면, 싫어요를 1 줄인다.

        DisLike.findOneAndDelete(variable)
        .exec((err, disLikeResult) => {
            if(err) return res.status(400).json({ success : false, err})
            res.status(200).json({ success : true})
        })
    })
})

router.post('/unLike', (req, res) => {
    let variable ={}
    if(req.body.videoId) {
        variable={
            videoId : req.body.videoId,
            userId : req.body.userId
        }
    } else {
        variable = {
            commentId : req.body.commentId,
            userId : req.body.userId
        }
    }

    Like.findOneAndDelete(variable)
    .exec((err, result) => {
        if(err) return res.status(400).json({ success : false, err})
        res.status(200).json({ success : true})
    })

})

router.post('/unDisLike', (req, res) => {
    let variable ={}
    if(req.body.videoId) {
        variable={
            videoId : req.body.videoId,
            userId : req.body.userId
        }
    } else {
        variable = {
            commentId : req.body.commentId,
            userId : req.body.userId
        }
    }

    DisLike.findOneAndDelete(variable)
    .exec((err, result) => {
        if(err) return res.status(400).json({ success : false, err})
        res.status(200).json({ success : true})
    })
})

router.post('/upDisLike', (req, res) => {
    let variable ={}
    if(req.body.videoId) {
        variable={
            videoId : req.body.videoId,
            userId : req.body.userId
        }
    } else {
        variable = {
            commentId : req.body.commentId,
            userId : req.body.userId
        }
    }
    // Dislike collection에 클릭 정보를 넣음
    const dislike = new DisLike(variable);

    dislike.save((err, DisLikeResult) => {
        if(err) return res.json({ success : false, err})
        // 만약 좋아요가 이미 클릭 되어 있다면, 좋아요를 1 줄인다.

        Like.findOneAndDelete(variable)
        .exec((err, disLikeResult) => {
            if(err) return res.status(400).json({ success : false, err})
            res.status(200).json({ success : true})
        })
    })
})
module.exports = router;