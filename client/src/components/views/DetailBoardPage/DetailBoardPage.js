import React, { useEffect, useState } from 'react'
import { Row, Col,Card } from "antd"
import { Image } from 'antd';
import Comments from './Sections/Comments';
import Axios from 'axios';

const { Meta } = Card;


function DetailBoardPage(props) {

    const boardId = props.match.params.boardId
    // console.log(props.match.params.boardId)
    const variable = {boardId:boardId}

    const [Board, setBoard] = useState([])
    const [comments, setcomments] = useState([])

    useEffect(() => {

        Axios.post("/api/sns/getBoardDetail", variable)
        .then(response => {
            if(response.data){
                console.log(response.data)
                setBoard(response.data)
            }else{
                alert("게시글 정보를 가져오는데 실패하였습니다.")
            }
        })

        Axios.post('/api/comment/getComment',variable)
        .then(response=>{
            if(response.data.success){ 
                console.log(response.data.comment)
                setcomments(response.data.comment)
            }else{
                alert("Err")
            }
        })
        
    }, [])
    // console.log(Board[0]&& Board[0].image)

    var renderBoard = () =>{
        if(Board[0]&& Board[0].image && Board[0].image.length >0){
            return(
                <Card
                    hoverable
                    style={{ maxwidth: "90%", margin:'2rem 2rem' }}
                    cover={<Image 
                        style={{height:"600px"}}
                        alt="example" 
                        src={`http://localhost:5000/${Board[0]&& Board[0].image}`}/>}
                >
                    <Meta title={Board[0]&& Board[0].title} description={Board[0]&& Board[0].description} />
                </Card>
            )
        }else{
            return (
                <Card 
                style={{ 
                    overflowX:'hidden',overflowy:'hidden',
                    maxwidth: "90%", margin:'2rem 2rem',border:"2px solid gray",
                    borderRadius:"10px",height:"700px",fontSize:"20px"
                }}
                title={<h1>{Board[0]&& Board[0].title}</h1>}
                size="large"
                bordered={false}>
                {Board[0]&& Board[0].description}
                </Card>

            )

        }
    }
    
    return (
        <Row gutter={[16,16]}>
            <Col lg={12} xs={24}>
                {renderBoard()}
            </Col>
            <Col lg={12} xs={24}>
                <Comments content={comments} boardId={boardId}/>
            </Col>
        </Row>
    )
}

export default DetailBoardPage
