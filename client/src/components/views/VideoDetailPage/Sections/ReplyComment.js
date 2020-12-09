import React, { useEffect, useState } from 'react'
import SingleComment from './SingleComment'

function ReplyComment(props) {

    const [ChildCommentNumber, setChildCommentNumber] = useState(0)
    const [OpenReplyComments, setOpenReplyComments] = useState(false)

    useEffect(() => {
        let commentNumber = 0;
        props.commentList.map((comment) => {
            if(comment.responseTo === props.parentCommentId) {
                commentNumber++
            }
        })
        console.log(`코멘트갯수 = ${commentNumber}`)
        setChildCommentNumber(commentNumber)
    }, [props.commentList])

    const renderReplyComment = (parentCommentId) => 
        props.commentList.map((comment, index) => (
            <React.Fragment>
            {comment.responseTo === parentCommentId &&
                <div style={{ width : '80%', marginLeft : '40px', cursor : 'pointer'}}>
                    <SingleComment key = {index} stateRefresh={props.stateRefresh} comment = {comment} postId = {props.videoId}/>
                    <ReplyComment stateRefresh={props.stateRefresh} commentList = {props.commentList} postId = {props.videoId} parentCommentId={comment._id}/>
                </div>
            }
            </React.Fragment>
    ))
    

    const onHandleChange = () => {
        setOpenReplyComments(!OpenReplyComments)
    }
    

    return (
        <div>

        {ChildCommentNumber > 0 &&
            <p style={{ fontSize: '14px', margin: 0, color: 'gray', cursor : 'pointer'}}
                onClick={onHandleChange} >
                View {ChildCommentNumber} more comment(s)
            </p>
        }

        {OpenReplyComments &&
            renderReplyComment(props.parentCommentId)
        }

    </div>
    )
}

export default ReplyComment
