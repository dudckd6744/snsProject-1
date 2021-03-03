import React, { useState } from 'react'
import { Form, Input, Button,Comment, message} from "antd"
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

        if(Comments === ""){
            message.warn("메세지를 입력해주세요")
        }else{
            Axios.post("/api/comment/saveComment",body)
            .then(response=>{
                if(response.data.success){
                    setComments("")
                    props.refreshFunction(response.data.result)
                    console.log(response.data.result)
                }else{
                    alert("err")
                }
            })
        }
        // console.log(user._id)
    }
    // console.log(props.content)
    const renderSingComment=()=>(
        props.content && props.content.map((comments ,i)=>(
        <React.Fragment key={i}>
            <SingleComment refreshFunction={props.refreshFunction} comments={comments} boardId={props.boardId}/>
        </React.Fragment>
        ))
        .sort((a,b)=>
        b.key - a.key
    )
        
    )
    return (
        <div>
            <div style={{
                maxWidth:"90%", margin:"2rem 2rem",border:"2px solid black",    
                borderRadius:"10px" ,height:"600px",overflowY:"scroll"
                }}>
                {renderSingComment()}
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