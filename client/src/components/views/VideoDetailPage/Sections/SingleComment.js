import React, { useState } from 'react'
import {useSelector} from 'react-redux'
import { Comment, Avatar, Button, Input } from 'antd';
import Axios from 'axios';
import LikeDisLikes from './LikeDisLikes'

const { TextArea } = Input;

function SingleComment(props) {
    const user = useSelector(state => state.user)
    const [OpenReply, setOpenReply] = useState(false);
    const [CommentValue, setCommentValue] = useState("");

    const onClickReplyOpen = () => {
        setOpenReply(!OpenReply);
    }

    const onHandleChange = (e) => {
        setCommentValue(e.currentTarget.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const variable = {
            content : CommentValue,
            writer : user.userData._id,
            postId : props.postId,
            responseTo : props.comment._id 
        }
        Axios.post('/api/comment/saveComment', variable)
        .then(response => {
            if(response.data.success) {
                setCommentValue("");
                setOpenReply(!OpenReply);
                props.stateRefresh(response.data.result);
            } else {
                alert("댓글 저장 실패")
            }
        })
    }
    
    const actions = [
        <LikeDisLikes userId={localStorage.getItem('userId')} commentId={props.comment._id}/> 
        ,<span onClick={onClickReplyOpen} key ="comment-basic-reply-to">Reply to</span>
    ]
    
    return (
        <div>
            <Comment 
                actions={actions}
                author={props.comment.writer.name}
                avatar = {<Avatar src={props.comment.writer.image} alt />}
                content = { <p>{props.comment.content}</p>}
            />
    {OpenReply &&
        <form style={{ dispaly : 'flex '}} onSubmit={onSubmit} >
            <textarea 
                style = {{ width : '100%', borderRadius : '5px'}}
                onChange={onHandleChange}
                value = {CommentValue}
                placeholder="답글을 작성해 주세요"
            />
            <br/>
            <button style={{ width : '20%', height : '52px'}} onClick={onSubmit}>작성하기</button>
        </form>
    }
        
        </div>
    )
}

export default SingleComment
