import { Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { Col, Rows,  List, Avatar, Button } from 'antd';
import Axios from 'axios';
import SideVideo from './Sections/SideVideo'
import Subscribe from './Sections/Subscriber'
import Comment from './Sections/Comment'


function VideoDetailPage(props) {

    const [VideoDetail, setVideoDetail] = useState([])
    const [Comments, setComments] = useState([])

    const videoId = props.match.params.videoId
    const variable = {
        videoId : videoId
    }

    useEffect(() => {
        Axios.post('/api/video//getVideoDetail', variable)
        .then(response => {
            if(response.data.success) {
                setVideoDetail(response.data.videoDetail)
            } else {
                alert('비디오 정보 가져오기 실패')
            }
        })
        console.log(Comments)

        Axios.post('/api/comment/getComments', variable)
        .then(response => {
            if(response.data.success) {
                setComments(response.data.comments);
            } else {
                alert('댓글 정보 가져오기 실패')
            }
        })
    }, [])

    const stateRefresh = (newComment) => {
        setComments(Comments.concat(newComment))
    }

    if(VideoDetail.writer) {
        const subscribeButton = VideoDetail.writer._id != localStorage.getItem('userId') && <Subscribe userTo={VideoDetail.writer._id} userFrom={localStorage.getItem('userId')}/>
        return (
            <div>
                <Row gutter={[16, 16]}>
                    <Col lg={18} xs={24}>
                        <div style={{ width : '100%', padding : '3rem 4rem'}}>
                            <video style={{ width : '100%', height : '600px', outline : 'none', cursor : 'pointer' }} src={`http://localhost:5000/${VideoDetail.filePath}`} controls/>
                            <List.Item
                                actions={[subscribeButton]}
                                >
                                <List.Item.Meta
                                    avatar={<Avatar src={VideoDetail.writer.image} />}
                                    title={VideoDetail.writer.name}
                                    description={VideoDetail.description}
                                    />
                            </List.Item>
    
                            {/* comment */ }
                            <Comment stateRefresh={stateRefresh} commentList = {Comments} postId = {videoId}/>
                        </div>
                    </Col>
                    <Col lg={6} xs={24}>
                       <SideVideo />
                    </Col>
                </Row>
            </div>
        )
    } else {
        return <div>Lodaing...</div>
    }
   
}

export default VideoDetailPage