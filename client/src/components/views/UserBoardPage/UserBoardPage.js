import React from 'react'
import { Card,Image } from 'antd';

const { Meta } = Card;

function UserBoardPage() {
    return (
        <div style={{maxWidth:"800px", margin:"2rem auto"}}>
            <h2>user name</h2>
            <hr />
            <Card 
                style={{ maxWidth:"700px",width:'700px' ,margin: "2rem auto"}}
                cover={
                <Image
                    style={{ height:"300px"}}
                    // alt="example"
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" 
                />
                }
                >   
                <a href  >
                <Meta
                avatar="dddd"
                title="dddd"
                description="dddd"
                />
                </a>
            </Card>
        </div>
    )
}

export default UserBoardPage
