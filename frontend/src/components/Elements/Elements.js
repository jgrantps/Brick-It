import React from 'react'
import uuid from 'react-uuid'

export const TitleHeading = (props) => {
    return <h2 className="font-bold leading-tight text-xl">{props.name}</h2>
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
    
    // export const CommentList = (props) => {
        //     if (props.comments) {
            //         props.comments.map(comment => {  
                //             return <p className="leading-tight font-bold text-sm">{comment.comment}</p>
                //         })
                //     } else {
                    //         return <p className="leading-tight font-bold text-sm">Be The First To Comment!</p>
                    //     }
                    // }
                    
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
    return <p className="leading-tight font-bold text-sm">{props.comment}</p>
}
