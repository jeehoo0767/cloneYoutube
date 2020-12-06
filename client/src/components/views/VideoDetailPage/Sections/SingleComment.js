import React, { useState } from 'react'
import {useSelector} from 'react-redux'
import { Comment, Avatar, Button, Input } from 'antd';
import Axios from 'axios';

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
            responseTo : 
        }
        Axios.post('/api/comment/saveComment', variable)
        .then(response => {
            if(response.data.success) {
                console.log(response.data);
            } else {
                alert("댓글 저장 실패")
            }
        })
    }
    
    const actions = [
        <span onClick={onClickReplyOpen} key ="comment-basic-reply-to">Reply to</span>
    ]
    
    return (
        <div>
            <Comment 
                actions={actions}
                author
                avatar = {<Avatar src alt />}
                content
            />
    {OpenReply &&
        <form style={{ dispaly : 'flex '}} onSubmit={onSubmit} >
            <textarea 
                style = {{ width : '100%', borderRadius : '5px'}}
                onChange={onHandleChange}
                value = {CommentValue}
                placeholder="코멘트를 작성해 주세요"
            />
            <br/>
            <button style={{ width : '20%', height : '52px'}} onClick={onSubmit}>작성하기</button>
        </form>
    }
        
        </div>
    )
}

export default SingleComment
