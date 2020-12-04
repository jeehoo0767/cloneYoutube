import Axios from 'axios';
import React, {useState} from 'react'
import {useSelector} from 'react-redux';

function Comment(props) {

    const user = useSelector(state => state.user);

    const [CommentValue, setCommentValue] = useState("")

    const handleValueChange = (e) => {
        setCommentValue(e.currentTarget.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const variable = {
            content : CommentValue,
            writer : user.userData._id,
            postId : props.postId
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

    return (
        <div>
            <br/>
            <p>Replies</p>
            <hr/>

            <form style={{ dispaly : 'flex '}} onSubmit={onSubmit}>
                <textarea 
                    style = {{ width : '100%', borderRadius : '5px'}}
                    onChange={handleValueChange}
                    value={CommentValue}
                    placeholder="코멘트를 작성해 주세요"
                />
                <br/>
                <button style={{ width : '20%', height : '52px'}} onClick={onSubmit}>작성하기</button>
            </form>
        </div>
    )
}

export default Comment
