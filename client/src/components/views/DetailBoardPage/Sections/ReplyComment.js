import React, { useEffect, useState } from 'react'
import { Comment, Avatar } from 'antd';
import { useSelector } from 'react-redux';
import {RestOutlined } from '@ant-design/icons';

function ReplyComment(props) {

    const [commentNum, setcommentNum] = useState(0)
    // const boardId = props.boardId
    const user = useSelector(state => state.user)
    const [OpenReplyComment, setOpenReplyComment] = useState(false)


    useEffect(() => {
        var commentNumber= 0;

        props.comments.map((comment)=>{
            if(comment.responseTo === props.responseCommentId)
            commentNumber ++
            return null;
        })
        setcommentNum(commentNumber)
    }, [])
    console.log(props.commentsMap &&props.commentsMap.writer._id)
    const renderdelete=()=>{
        // console.log(props.comments.writer._id)
            if(user.userData._id === props.commentsMap.writer._id){   
            
                return(
                [
                <RestOutlined onClick/>
            ])
            }else{
                return(
                [
            ])
            }
        }
    const handleReplycomment=(responseCommentId)=>
        props.comments.map((comment,i)=>(
                <React.Fragment key={i}  >
                {comment.responseTo === responseCommentId &&
                    <Comment
                        actions={renderdelete()}
                        author={comment.writer.name}
                        avatar={<Avatar arc={comment.writer.image} alt="image"/>}
                        content={
                        <p>
                            {comment.content}
                        </p>
                        }
                        >   
                    </Comment>
                }
                </React.Fragment>
        ))
        
    const onClickChange =()=>{
        setOpenReplyComment(!OpenReplyComment)
    }

    return (
        <div style={{maxWidth:"100%",marginTop:"-35px" ,marginLeft:' 8rem', zIndex:"1"}}>
            {commentNum > 0&& 
                <p style={{fontSize:"12px", color:"gray"}} onClick={onClickChange}>
                -View {commentNum}  more comment(s)
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
