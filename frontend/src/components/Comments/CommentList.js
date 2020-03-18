import React from 'react'

export const CommentList = (props) => {
    props.comments.map(comment => {
        return <p className="leading-tight font-bold text-sm">{comment.comment}</p>
    })
}
