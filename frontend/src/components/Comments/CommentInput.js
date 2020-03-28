import React from 'react';

import {SubmitBtn} from '../Elements/Elements'
import { TextField } from '../Elements/Elements';

export const CommentInput = (props) => {
    const {trackChange, commentState, handleSubmit, selectionId} = props
    return (
        <form>
            <div className="my-2 my-2">
                <label className="font-semibold flex flex-col">
                    Comment:
                    <TextField type="text" trackChange={trackChange} value={commentState} name="comment-field" id={null} />
                </label>
                <SubmitBtn btnAction={handleSubmit} btnId={selectionId} btnName="Submit"/>
            </div>
        </form>
    )
}