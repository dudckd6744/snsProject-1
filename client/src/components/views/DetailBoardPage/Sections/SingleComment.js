import React, { useEffect, useState } from 'react'
import { Comment, Avatar, message,Form, Input, Button } from 'antd';
import Axios from 'axios';
import {RestOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import ReplyComment from './ReplyComment';


function SingleComment(props) {
    // const boardId = props.boardId

    const user = useSelector(state => state.user)
    const [OpenReply, setOpenReply] = useState(false)
    const [Replycomment, setReplycomment] = useState("")

    const handleOpenReply=()=>{
        setOpenReply(!OpenReply)
    }

    const handelDelete =()=>{
        
        var body ={
            // writer:user._id,
            _id:props.commentsMap._id
        }
        if(user.userData._id === props.commentsMap.writer._id){
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
    const renderdelete=()=>{
        // console.log(props.comments.writer._id)
            if(user.userData._id === props.commentsMap.writer._id){
            
                return(
                [<span key="comment-reply-to1"   onClick={handleOpenReply}>Reply to</span>,
                <RestOutlined  onClick={handelDelete}/>,
                // <ReplyComment commentsMap={props.commentsMap} comments={props.commentList} responseCommentId={props.commentsMap._id}boardId={props.boardId}/>
            ])
            }else{
                return(
                [<span key="comment-reply-to2" onClick={handleOpenReply}>Reply to</span>,
                // <ReplyComment commentsMap={props.commentsMap} comments={props.commentList} responseCommentId={props.commentsMap._id}boardId={props.boardId}/>
            ])
            }
        }

        const handleKeydown =(event)=>{
            // 엔터키 누를시 코멘트 입력 시켜주기
            // console.log(event.keyCode)
            if(event.keyCode ===13){
                handleSubmit();
            }
        }

        const handleComment =(e)=>{
            setReplycomment(e.currentTarget.value)
        }

        const handleSubmit=()=>{
            
            let body ={
                writer: user.userData._id,
                boardId:  props.boardId,
                responseTo: props.commentsMap._id,
                content: Replycomment
            }

            Axios.post("/api/comment/saveComment",body)
            .then(response=>{
                if(response.data.success){
                    setReplycomment("")
                    props.refreshFunction(response.data.result)
                    setOpenReply(false)
                    console.log(response.data.result)
                }else{
                    alert("err")
                }
            })
        }
    return (
        <div>
            <Comment
                style={{margin:"0 1rem"}}
                actions={renderdelete()}
                author={props.commentsMap&&props.commentsMap.writer.name}
                avatar={props.commentsMap&&props.commentsMap.writer&&props.commentsMap.writer.image}
                content={
                <p>
                    {props.commentsMap&&props.commentsMap.content}
                </p>
                }
                >   
            </Comment>
            {OpenReply && 
            <Form onKeyDown={handleKeydown}
            onSubmit={handleSubmit}
            style={{
                marginLeft:"50px", marginTop:"-17px"
            }}>
                <Input 
                value={Replycomment}
                onChange={handleComment}
                style={{width:"400px",height:"30px"}} 
                size="large"
                placeholder="코멘트를 작성해주세요..."
                />
                <Button 
                style={{display:"none"}} 
                size="small"
                type="primary"
                onClick={handleSubmit}
                > 
                확인</Button>
            </Form>
            }
        </div>
    )
}

export default SingleComment