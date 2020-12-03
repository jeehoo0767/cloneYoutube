import { Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { Col, Rows,  List, Avatar, Button } from 'antd';
import Axios from 'axios';
import SideVideo from './Sections/SideVideo'
import Subscribe from './Sections/Subscriber'

function VideoDetailPage(props) {

    const [VideoDetail, setVideoDetail] = useState([])

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
    }, [])

    if(VideoDetail.writer) {
        return (
            <div>
                <Row gutter={[16, 16]}>
                    <Col lg={18} xs={24}>
                        <div style={{ width : '100%', padding : '3rem 4rem'}}>
                            <video style={{ width : '100%', outline : 'none', cursor : 'pointer' }} src={`http://localhost:5000/${VideoDetail.filePath}`} controls/>
                            <List.Item
                                actions={[<Subscribe userTo={VideoDetail.writer._id} userFrom={localStorage.getItem('userId')}/>]}
                                >
                                <List.Item.Meta
                                    avatar={<Avatar src={VideoDetail.writer.image} />}
                                    title={VideoDetail.writer.name}
                                    description={VideoDetail.description}
                                    />
                            </List.Item>
    
                            {/* comment */ }
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