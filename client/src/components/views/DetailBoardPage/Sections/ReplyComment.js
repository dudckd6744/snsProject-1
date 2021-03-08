import React, { useEffect, useState } from 'react'
import { Comment, Avatar, message } from 'antd';
import { useSelector } from 'react-redux';
import {RestOutlined } from '@ant-design/icons';
import Axios from "axios";

function ReplyComment(props) {

    const [commentNum, setcommentNum] = useState(0)
    // const boardId = props.boardId
    const user = useSelector(state => state.user)
    const [OpenReplyComment, setOpenReplyComment] = useState(false)
    const [Reply, setReply] = useState([])


    useEffect(() => {
        //대댓글 수를 구해준다
        var commentNumber= 0;

        props.comments.map((comment)=>{
            if(comment.responseTo === props.responseCommentId)
            commentNumber ++
            return null;
        })
        setcommentNum(commentNumber)
    }, [props])

    const handelDelete =(commente)=>{
        var body ={
            _id:commente._id
        }
        console.log(commente.writer._id)
        if(user.userData._id === commente.writer._id){
            Axios.post('/api/comment/deleteComment',body)
            .then(response=>{
                if(response.data.success){
                    console.log(response.data)
                    props.refreshDelete(response.data.comment)
                }else{
                    message.warning("err")
                }
            })
        }else{
            message.warning("본인의 댓글이아닙니다")
        }
        
    }

    const renderdelete=(comment)=>{
        // console.log(props.comments.writer._id)
            if( user.userData._id === comment.writer._id)
            return  [<RestOutlined key={comment._id} onClick={()=>{handelDelete(comment)}}/>]
    }
            

    const handleReplycomment=(responseCommentId)=>
        props.comments.map((comment,i)=>(
                <React.Fragment key={i}  >
                {comment.responseTo === responseCommentId &&
                <div style={{ width:"80%", marginLeft:"50px"}}>
                    <Comment
                        // style={{float:"left"}}
                        actions={renderdelete(comment)}
                        author={comment.writer.name}
                        avatar={comment&&comment.writer&&comment.writer.image}
                        content={
                        <p>
                            {comment.content}
                        </p>
                        }
                        >   
                    </Comment>
                </div>
                }
                </React.Fragment>
        ) 
        )
        
    const onClickChange =()=>{
        setOpenReplyComment(!OpenReplyComment)
    }

    return (
        <div style={{ position:"relative" }}>
            {commentNum > 0&& 
                <p style={{fontSize:"12px", color:"gray" }} onClick={onClickChange}>
                - View {commentNum}  more comment(s)
                </p>
            }
            <div >
            {OpenReplyComment &&
                handleReplycomment(props.responseCommentId)
            }
            </div>
        </div>
    )
}

export default ReplyComment
