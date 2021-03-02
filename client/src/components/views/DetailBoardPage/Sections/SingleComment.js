import React, { useEffect } from 'react'
import { Comment, Avatar, message } from 'antd';
import Axios from 'axios';
import {RestOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';


function SingleComment(props) {
    // const boardId = props.boardId

    const user = useSelector(state => state.user.userData)
    const comment = props.content

    const handelDelete =()=>{
        
        var body ={
            writer:user._id,
            _id:comment
        }
        console.log(props.content._id)
        Axios.post('/api/comment/deleteComment',body)
        .then(response=>{
            if(response.data.success){
                console.log(response.data)
            }else{
                message.warning("err")
            }
        })

    }
    const actions=[
        <span key="comment-reply-to">Reply to</span> ,<RestOutlined onClick={handelDelete}/>
    ]

    const renderComment= 
        comment && comment.map((comments , i)=>(
            <Comment key={i}
                style={{margin:"0 1rem"}}
                actions={actions}
                author={comments.writer.name}
                avatar={<Avatar arc={comments.writer.image} alt="image"/>}
                content={
                <p>
                    {comments.content}
                </p>
                }
                >   
            </Comment>
    ))
    .sort((a,b)=>
        b.key - a.key
    )

    
    
    

    return (
        <div>
            {renderComment}
        </div>
    )
}

export default SingleComment