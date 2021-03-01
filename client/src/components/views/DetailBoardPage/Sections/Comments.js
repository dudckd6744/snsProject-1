import React, { useState } from 'react'
import { Form, Input, Button,Comment} from "antd"
import { useSelector } from 'react-redux'
import Axios from 'axios'
import SingleComment from './SingleComment'

function Comments(props) {

    const user = useSelector(state => state.user.userData)
    const boardId = props.boardId

    const [Comments, setComments] = useState("")

    const handleComment =(event)=>{
        setComments(event.currentTarget.value)

    }
    const handleKeydown =(event)=>{
        console.log(event.keyCode)
        if(event.keyCode ===13){
            handleSubmit();
        }

    }

    const handleSubmit =(event)=>{
        
        
        var body ={
            writer:user._id,
            boardId:boardId,
            content:Comments
        }
        // console.log(user._id)

        Axios.post("/api/comment/saveComment",body)
        .then(response=>{
            if(response.data.success){
                setComments("")
            }else{
                alert("err")
            }
        })
    }

    return (
        <div>
            <div style={{
                maxWidth:"90%", margin:"2rem 2rem",border:"2px solid black",    
                borderRadius:"10px" ,height:"600px",overflowY:"scroll"
                }}>
                <SingleComment content={props.content} boardId={props.boardId}/>
            </div>
            <Form onKeyDown={handleKeydown}
            onSubmit={handleSubmit}
            style={{
                maxWidth:"90%",margin:"2rem 2rem"
            }}>
                <Input 
                value={Comments}
                onChange={handleComment}
                style={{width:"85%",height:"50px"}} 
                size="large"
                />
                <Button 
                
                style={{width:"15%",height:"50px"}} 
                size="large" 
                type="primary"
                onClick={handleSubmit}
                > 
                확인</Button>
            </Form>
        </div>
    )
}

export default Comments
