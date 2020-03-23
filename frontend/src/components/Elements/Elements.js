import React from 'react'
import uuid from 'react-uuid'
import DeleteComment from '../../assets/images/deleteCommentSVG'
import service from '../../classes/service'
import CommentContainer from '../../containers/CommentContainer'

export const TitleHeading = (props) => {
    return <h2 className={props.headingClass}>{props.name}</h2>
}

export const SelectionImage = (props) => {
    return <img src={props.image} alt={props.name} width='242' height='142'/>
}

export const TextField = (props) => {
    return <input type={props.type} onChange={props.trackChange} value={props.value} name={props.name} id={props.id} className="submit-btn"/>
}

export  const SelectionPrompt = (props) => {
    return (
        <div className="selection-prompt-wrapper">
            <h2 className="selection-prompt">{props.prompt}</h2>
        </div>
        )
    }
                    
export const SelectThemeBtn = ({child, handlOnClick}) => {
    return (
        <button key={uuid()} className="theme-tile" id={child.api_id} onClick={handlOnClick}>
            <h2 className="text-lg text-gray-700 pb-2 pointer-events-none">
                {child.name}
            </h2>
        <h3 className="text-black font-light leading-tight text-xs pointer-events-none">BROWSE SETS</h3> 
        </button>
    )
}

export const SubmitBtn = (props) => {
    return <input className="submit-btn w-1/2 mr-2 my-2" id="login-btn" type="submit" onClick={props.btnAction} value={props.btnName}/>
}

export const CommentList = (props) => {
    const {comment, handleOnClick} = props
    // debugger
    return (
        <div key={uuid()} className="flex border justify-between rounded-lg m-1 px-2 ">
            <div className=" flex flex-col">
                <h3 className="font-bold">{comment.user.name}:</h3>
                <h2>{comment.comment}</h2>
            </div>
            <button id={comment.id}   className="pointer-events-auto z-20" onClick={handleOnClick}>
                <DeleteComment /> </button>
        </div>
    )
}

export const TileWrapper = (props) => {
    const {unit,comments, isPublic} = props
    debugger
    return(
        <div key={uuid()} className={isPublic ? "rounded-lg bg-gray-500 flex flex-col m-4 px-6 shadow" : "rounded-lg bg-blue-500  flex flex-col m-4 px-6 shadow"}>
        {service.publicTag(isPublic)}
        <SelectionImage name={unit.name} image={unit.set_img_url} />
        <TitleHeading name={unit.name} />
        <CommentContainer currentSelection={comments}/>
    </div> 
    )
}