import React from 'react';

import {SubmitBtn} from '../Elements/Elements'

export const CommentInput = (props) => {
    const {trackChange, commentState, handleSubmit, selectionId, handleBlur, handleFocus} = props

    return (
        <form onSubmit={handleSubmit} id={selectionId} >
            <div className="my-2 my-2">
                <label className="font-semibold flex flex-col">
                    Comment:
                    <input type={"text"} onChange={trackChange} onFocus={handleFocus} onBlur={handleBlur} value={commentState} name="comment-field" id={null} className="submit-btn"/>
                </label>
                <SubmitBtn btnAction={handleSubmit} btnId={selectionId} btnName="Submit"/>
            </div>
        </form>
    )
}