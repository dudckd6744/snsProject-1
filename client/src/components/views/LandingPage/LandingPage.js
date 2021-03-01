import React, { useEffect, useState } from 'react'
import { Card,Image  } from 'antd';
import Axios from 'axios';
const { Meta } = Card;


function LandingPage() {
    const [Board, setBoard] = useState([])

    useEffect(() => {
        Axios.get('/api/sns/getboard')
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
                        <a href ={`board/${board._id}`} >
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
    {renderBoard}
        </>
    )
}

export default LandingPage
