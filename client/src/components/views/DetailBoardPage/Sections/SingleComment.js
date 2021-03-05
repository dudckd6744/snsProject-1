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
                    // setComments("")
                    // props.refreshFunction(response.data.result)
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
                avatar={<Avatar arc={props.commentsMap&&props.commentsMap.writer.image} alt="image"/>}
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
                maxWidth:"90%",marginLeft:"60px", marginTop:"-17px"
            }}>
                <Input 
                value={Replycomment}
                onChange={handleComment}
                style={{width:"90%",height:"30px"}} 
                size="large"
                placeholder="코멘트를 작성해주세요..."
                />
                <Button 
                
                style={{width:"10%",height:"30px"}} 
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