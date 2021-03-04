import React, { useEffect, useState } from 'react'

function ReplyComment(props) {

    const [commentNum, setcommentNum] = useState(0)

    useEffect(() => {
        var commentNumber= 0;

        props.comments.map((comment)=>{
            if(comment.responseTo === props.responseCommentId)
            commentNumber ++
            return null;
        })

        setcommentNum(commentNumber)
    }, [props.responseCommentId, props.comments])
    return (
        <div>
            {commentNum > 0&& 
                <p style={{fontSize:"14px",margin:'0', color:"blue"}} onClick>
                -View {commentNum}  more comment(s)
                </p>
            }
            
        </div>
    )
}

export default ReplyComment
