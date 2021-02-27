import React, { useEffect, useState } from 'react'
import { Card, Icon } from 'antd';
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
                    <a href ={`${board._id}`} key={i}>
                    <Card 
                        style={{ maxWidth:"700px", margin: "2rem auto"}}
                        cover={
                        <img
                            style={{ height:"300px"}}
                            alt="example"
                            src={`http://localhost:5000/${board.image}`}
                        />
                        }
                        actions={[
                        
                        // <Icon type="setting"/>,
                        // <Icon type="ellipsis"/>

                        ]}
                    >
                        <Meta
                        avatar={board.writer.name}
                        title={board.title}
                        description={board.description}
                        />
                    </Card>
                    </a>
                )
            }else{
                return(
                    <a href ={`${board._id}`} key={i}>
                    <Card 
                        style={{ maxWidth:"700px", margin: "2rem auto"}}
                        
                        actions={[
                        
                        // <Icon type="setting"/>,
                        // <Icon type="ellipsis"/>

                        ]}
                    >
                        <Meta
                        avatar={board.writer.name}
                        title={board.title}
                        description={board.description}
                        />
                    </Card>
                    </a>
                )
            }
            
    })

    return (
    <>
    {renderBoard}
            
        </>
    )
}

export default LandingPage
