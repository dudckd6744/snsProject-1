const express = require('express');
const router = express.Router();
const multer = require('multer')

const { Board } = require("../models/Board");

//=================================
//             sns
//=================================

let storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'uploads/')
    },
    filename: function(req,file,cb){
        cb(null ,`${Date.now()}_${file.originalname}`)
    }
})

let upload = multer({ storage:storage}).single("file")

router.post("/board", (req, res) => {

    upload(req,res,err => {
        if(err) return res.json({success:false,err})
        return res.json({success:true, filePath:res.req.file.path, fileName:res.req.file.filename})
});
});

router.post("/upload", (req, res) => {

    const board = new Board(req.body)
    console.log(req.body)
    board.save((err,result)=>{
        if(err) return res.status(400).json({success:false,err})
        return res.status(200).json({success:true , result})
    })
});

router.get("/getboard", (req, res) => {

    Board.find()
    .populate('writer')
    .exec((err, board)=>{
        if(err) return res.status(400).json({success:false,err})
        return res.status(200).json({success:true, board})
    })
});

router.post("/getuserboard", (req, res) => {
    console.log(req.body.writer)

    Board.find({writer:req.body.writer})
    .populate('writer')
    .exec((err, board)=>{
        if(err) return res.status(400).json({success:false,err})
        return res.status(200).json({success:true, board})
    })
});

router.post("/getBoardDetail", (req, res) => {
    
    Board.find({_id:req.body.boardId})
    .populate('writer')
    .exec((err, board)=>{
        if(err) return res.status(400).json({success:false,err})
        return res.status(200).send(board)
    })
});



module.exports = router;
