import React, { useEffect, useState } from 'react'
// import Image from 'react-bootstrap/Image'
import { Card ,Image} from 'antd';
import { useSelector } from 'react-redux';
import Axios from 'axios';

const { Meta } = Card;

function UserBoardPage() {

    const [Board, setBoard] = useState([]);

    const user = useSelector(state => state.user.userData)
    
    useEffect(() => {

        const body ={
            writer: localStorage.getItem('userId')
        }
        
        console.log(body)

        Axios.post('/api/sns/getuserboard', body)
        .then(response => {
            if(response.data.success){
                console.log(response.data)
                setBoard(response.data.board)
            }else{
                alert("err")
            }
        })
    }, [])        

    
        
    var renderBoard = Board
    .map((board, i)=>{
            if(board.image && board.image.length > 0){
                return (                            
                    <Card key={i}
                        style={{ maxWidth:"700px",width:'700px' ,margin: "2rem auto"}}
                        cover={
                        <Image
                            style={{ height:"300px"}}
                            // alt="example"
                            src={`http://localhost:5000/${board.image}`}
                        />
                        }
                        >   
                        <a href ={`http://localhost:3000/board/${board._id}`} >
                        <Meta
                        avatar={board.writer.name}
                        title={board.title}
                        description={board.description}
                        />
                        </a>
                    </Card>
                )
            }else{
                return(
                    <Card key={i}
                        style={{ maxWidth:"700px", margin: "2rem auto"}}
                        
                        actions={[
                        
                        // <Icon type="setting"/>,
                        // <Icon type="ellipsis"/>

                        ]}
                    >
                        <a href ={`board/${board._id}`} >
                        <Meta
                        avatar={board.writer.name}
                        title={board.title}
                        description={board.description}
                        />
                        </a>
                    </Card>
                )
            }
            
    })
    .sort((a,b)=>
        b.key - a.key
    )

    return (
    <>
    <div style={{ maxWidth:"700px", margin:'2rem auto'}}>
    <img src={user&& user.image} style={{borderRadius:"70%",maxWidth:"40px",display: "inline-block"}} />
    <h2 style={{display: "inline-block" , marginLeft:"1rem"}}> {user&&user.name}</h2>
        <hr/>
    </div>
    {renderBoard}
        </>
    )
}

export default UserBoardPage
