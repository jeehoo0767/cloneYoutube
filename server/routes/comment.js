const express = require('express');
const router = express.Router();
const { Comment } = require('../models/Comment');

router.post('/saveComment', (req, res) => {
    const comment = new Comment(req.body);

    comment.save((err, comment) => {
        if(err) res.status(400).json({ success : false, err})
        
        Comment.find({'_id' : comment._id})
        .populate('writer')
        .exec((err, result) => {
            if(err) res.status(400).json({ success : false, err})
            res.status(200).json({ success : true, result})
        })
    });
})


module.exports = router;