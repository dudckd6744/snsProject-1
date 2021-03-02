const express = require('express');
const router = express.Router();

const { Comment } = require("../models/Comment");

//=================================
//             comment
//=================================

router.post("/saveComment", (req, res) => {
    
    const comment = new Comment(req.body)
    console.log(req.body)
    comment.save((err, doc)=>{
        if(err) return res.status(400).json({success:false, err})
        return res.status(200).json({success:true,doc})
    })
});


router.post("/getComment", (req, res) => {
    
    Comment.find({"boardId":req.body.boardId})
    .populate("writer")
    .exec((err,comment)=>{
        if(err) return res.status(400).json({success:false, err})
        return res.status(200).json({success:true, comment})   
    }) 
});

router.post("/deleteComment", (req, res) => {
    console.log(req.body)
    Comment.findOneAndDelete({"writer":req.body.writer},{"_id":req.body._id})
    .exec((err,comment)=>{
        if(err) return res.status(400).json({success:false, err})
        return res.status(200).json({success:true,comment})   
    }) 
});




module.exports = router;
