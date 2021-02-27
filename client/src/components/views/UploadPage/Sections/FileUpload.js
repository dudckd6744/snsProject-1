import React, { useState } from 'react'
import Dropzone from "react-dropzone";
import { Icon, Form } from "antd";
import Axios from 'axios';
//참고용

function FileUpload(props) {

    const [Images, setImages] = useState([]);

    const onDrop=(files)=>{

        var formData = new FormData();
        const config = {
            header:{'content-type':'multipart/form-data'}
        }
        formData.append('file',files[0])
        console.log('file', files)

        
    }

    const onDelet=(image)=>{
        const currentIndex = Images.indexOf(image)
        console.log(currentIndex)
        var newImages = [...Images]
        newImages.splice(currentIndex,1)

        setImages(newImages)
        props.refresh(newImages)
    }

    return (
        <div style={{ display:"flex", justifyContent:"space-between"}}>
            <Dropzone
                onDrop={onDrop}>
                {({getRootProps, getInputProps})=> (
                    <div style={{border:"1px solid lightgray", width:"300px", height:'240px',
                    alignItems:"center", justifyContent:"center", display:"flex"}} {...getRootProps()}>
                        <input {...getInputProps()}/>
                        <Icon type="plus" style={{fontSize:"3rem" }}/>
                    </div>
                )}
                </Dropzone>
                {/* <div style={{ display:"flex", width:"300px", height:"240px", overflowX:"scroll"}}>
                    {Images.map((image, i)=>(
                        <div onClick={()=>onDelet(image)} key={i}>
                            <img style={{ minWidth:"300px", width:"300px", height:"240px" }} 
                            src={`http://localhost:5000/${image}`}/>
                        </div>
                    ))}
                </div> */}
        </div>
    )
}

export default FileUpload