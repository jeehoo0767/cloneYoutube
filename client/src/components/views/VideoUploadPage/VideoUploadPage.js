import React, { useState } from 'react'
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import Dropzone from 'react-dropzone'
import Axios from 'axios';
import { useSelector } from 'react-redux';


const { Title } = Typography;

const { TextArea } = Input;

const PrivateOption = [
    {value : 0, label : "Private"},
    {value : 1, label : "Public"}
];

const CtegoryOption = [
    {value : 0, label : "Film & Animation"},
    {value : 1, label : "Autos & Vehicles"},
    {value : 2, label : "Music"},
    {value : 3, label : "Pets & Animals"},

]

function VideoUploadPage(props) {
    const user = useSelector(state => state.user);
    const [VideoTitle, setVideoTitle] = useState("");
    const [Description, setDescription] = useState("")
    const [Private, setPrivate] = useState(0);
    const [Category, setCategory] = useState("Film & Animation");
    const [FilePath, setFilePath] = useState("");
    const [Duration, setDuration] = useState("");
    const [ThumbnailPath, setThumbnailPath] = useState("");

    // const [inputs, setInputs] = useState({ VideoTitle : "", Description : ""});

    // const { VideoTitle, Description } = inputs;
    // const handleValueChange = (e) => {
    //     const { value, name} = e.target;
    //     const nextState = {};
    //     setInputs({
    //         ...inputs,
    //         [name] : value
    //     })
    //     console.log(inputs);
    // }

    const onTitleChange = (e) => {
        setVideoTitle(e.currentTarget.value);
    }

    const onDescriptionChange = (e) => {
        setDescription(e.currentTarget.value);
    }

    const onPrivateChange = (e) => {
        setPrivate(e.currentTarget.value);
    }

    const onCategoryChange = (e) => {
        setCategory(e.currentTarget.value);
        console.log(Category)
    }

    const onDrop = (files) => {
        let formData = new FormData;
        const config = {
            header : {'content-type' : 'multipart/form-data'}
        };
        formData.append("file", files[0]);

        Axios.post('/api/video/uploadfiles', formData, config)
        .then(response => {
            if(response.data.success) {
                console.log(response.data);
                let variable = {
                    url : response.data.url,
                    fileName : response.data.fileName
                }

                setFilePath(response.data.url);
                Axios.post('/api/video/thumbnail', variable)
                .then(response => {
                    if(response.data.success) {
                        console.log(`썸네일 패쓰 : ${response.data.thumbsFilePath}`)
                        setDuration(response.data.fileDuration);
                        setThumbnailPath(response.data.thumbsFilePath);
                    } else {
                        alert('썸네일 생성 실패')
                    }
                })
            } else {
                alert('비디오 업로드 실패')
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log("요청");
        const variables = {
            writer : user.userData._id,
            title : VideoTitle,
            description : Description,
            private : Private,
            filePath : FilePath,
            category : Category,
            duration : Duration,
            thumbnail : ThumbnailPath 
        }

        console.log(variables);
        Axios.post('/api/video/uploadVideo', variables)
        .then(response => {
            if(response.data.success) {
                message.success('업로드 성공');
                setTimeout(() => {
                    props.history.push('/');
                }, 3000);
                // console.log(response.data)
            } else {
                console.log(response.data);
            }
        })
    }

    return (
            <div style = {{ maxWidth : '700px', margin : '2rem auto' }}>
                <div style = {{ textAlign : 'center', marginBottom : '2rem' }}>
                    <Title level={2}>Upload Video</Title>
                </div>

                <Form onSubmit = {onSubmit}>
                    <div style={{ display : 'flex', justifyContent : 'space-between' }}>
                        <Dropzone
                            onDrop = {onDrop}
                            multiple = {false}
                            maxSize = {100000000}
                            >
                            {({getRootProps, getInputProps}) => (
                                <div style={{ width : '300px', height : '240px', border : '1px solid ltightgray', display : 'flex', 
                                alignItems : 'center', justifyContent : 'center'}} {...getRootProps()}>
                                    <input {...getInputProps()}/>
                                    <Icon type="plus" styl={{ fontSize : '3rem' }}/>
                                </div>
                            )}
                        </Dropzone>
                        {ThumbnailPath &&
                        <div>
                            <img src={`http://localhost:5000/${ThumbnailPath}`} alt="Thumbnail"/>
                        </div>
                        }
                        
                    </div>
                    <br/>
                    <br/>
                    <label>Title</label>
                    <Input 
                        name = "VideoTitle"
                        onChange = {onTitleChange}
                        value = { VideoTitle }
                    />
                    <br/>
                    <br/>
                    <label>Description</label>
                    <TextArea
                        name = "Description" 
                        onChange = {onDescriptionChange}
                        value = { Description } />
                    <br/>
                    <br/>
                    <select onChange={onPrivateChange}>
                        {PrivateOption.map((item, index) => {
                            return <option key = {index} value={item.value}>{item.label}</option>
                        })}
                    </select>

                    <br/>
                    <br/>

                    <select onChange={onCategoryChange}>
                    {CtegoryOption.map((item, index) => {
                            return <option key = {index} value={item.label}>{item.label}</option>
                        })}
                    </select>

                    <br/>
                    <br/>

                    <Button type="primary" size="large" onClick = {onSubmit}>
                        Submit
                    </Button>
                        
                </Form>
            </div>
    )
}

export default VideoUploadPage
