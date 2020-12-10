import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Tooltip, Icon } from 'antd';

function LikeDisLikes(props) {

    const [Likes, setLikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)
    const [DisLikes, setDisLikes] = useState(0)
    const [DisLikeAction, setDisLikeAction] = useState(null)

    let variable = {}

    if(props.video) {
        variable = {
            videoId : props.videoId,
            userId : props.userId
        }
    } else {
        variable = {
            commentId : props.commentId,
            userId : props.userId
        }
    }

    useEffect(() => {
        Axios.post('/api/like/getLikes', variable)
        .then(response => {
            if(response.data.success) {
                // 얼마나 많은 좋아요를 받았는지
                setLikes(response.data.likes.length)
                // 내가 이미 그 좋아요를 눌렀는지
                response.data.likes.map(like => {
                    if(like.userId === props.userId) {
                        setLikeAction('liked')
                    }
                })
            } else {
                alert('좋아요 정보 가져오기 실패')
            }
        })

        Axios.post('/api/like/getDisLikes', variable)
        .then(response => {
            if(response.data.success) {
                // 얼마나 많은 싫어요를 받았는지
                setLikes(response.data.dislikes.length)
                // 내가 이미 그 싫어요를 눌렀는지
                response.data.dislikes.map(dislike => {
                    if(dislike.userId === props.userId) {
                        setDisLikeAction('disliked')
                    }
                })
            } else {
                alert('싫어요 정보 가져오기 실패')
            }
        })
    }, [])

    return (
        <div>
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    <Icon type="like"
                        theme={LikeAction === 'liked' ? "filled" : "outlined"}
                        onClick
                    />
                </Tooltip>
                <span style={{ paddingLeft : '8px', cursor : 'pointer'}}>
                    {Likes}
                </span>
            </span>

            <span key="comment-basic-dislike">
                <Tooltip title="DisLike">
                    <Icon type="dislike"
                        theme={DisLikeAction === 'disliked' ? "filled" : "outlined"}
                        onClick
                    />
                </Tooltip>
                <span style={{ paddingLeft : '8px', cursor : 'pointer'}}>
                    {DisLikes}
                </span>
            </span>
        </div>
    )
}

export default LikeDisLikes
