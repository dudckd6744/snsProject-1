import React, { useEffect } from 'react'
import { Comment, Avatar, message } from 'antd';
import Axios from 'axios';
import {RestOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';


function SingleComment(props) {
    // const boardId = props.boardId

    const user = useSelector(state => state.user)
    const comment = props.comments

    const handelDelete =()=>{
        
        var body ={
            // writer:user._id,
            _id:props.comments._id
        }
        console.log(props.comments._id)
        if(user.userData._id === props.comments.writer._id){
            Axios.post('/api/comment/deleteComment',body)
            .then(response=>{
                if(response.data.success){
                    console.log(response.data)
                    props.refreshFunction(response.data.comment)
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
            if(user.userData._id === props.comments.writer._id){
            
                return(
                [<span key="comment-reply-to1">Reply to</span>,<RestOutlined onClick={handelDelete}/>]
                )
            }else{
                return(
                [<span key="comment-reply-to2">Reply to</span>]
                )
            }
        
        
    }

    
    return (
        <div>
            <Comment
                style={{margin:"0 1rem"}}
                actions={renderdelete()}
                author={props.comments&&props.comments.writer.name}
                avatar={<Avatar arc={props.comments&&props.comments.writer.image} alt="image"/>}
                content={
                <p>
                    {props.comments&&props.comments.content}
                </p>
                }
                >   
            </Comment>
        </div>
    )
}

export default SingleComment