import React, { useEffect } from 'react'
import { Comment, Avatar } from 'antd';
import Axios from 'axios';

function SingleComment(props) {
    // const boardId = props.boardId
    const comment = props.content

    const renderComment= comment
    .map((comments , i)=>(
            <Comment key={i}
                style={{margin:"0 1rem"}}
                actions={[<span key="comment-nested-reply-to">Reply to</span>]}
                author={comments&&comments.writer.name}
                content={
                <p>
                    {props.content[i]&&props.content[i].content}
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
