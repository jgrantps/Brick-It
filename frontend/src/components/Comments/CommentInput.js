import React from 'react';
import SubmitBtn from '../Buttons/SubmitBtn'

export const CommentInput = (props) => {
    const {trackChange, commentState, handleSubmit } = props
    return (
        <form>
             <div className="my-2 my-2">
                <label className="font-semibold flex flex-col">
                    Comment:
                    <input type="text" onChange={trackChange} value={commentState} name="name" className="submit-btn"/>
                </label>
                <SubmitBtn btnAction={handleSubmit} btnName="Submit"/>
                </div>
        </form>
    )
}