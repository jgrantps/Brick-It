import React from 'react'

export const TitleHeading = (props) => {
    return <h2 className="font-bold leading-tight text-xl">{props.name}</h2>
}

export const SelectionImage = (props) => {
    return <img src={props.image} alt={props.name} width='242' height='142'/>
}

export const TextField = (props) => {
    return <input type={props.type} onChange={props.trackChange} value={props.value} name={props.name} id={props.id} className="submit-btn"/>
}

export const SubmitBtn = (props) => {
    return <input className="submit-btn w-1/2 mr-2 my-2" id="login-btn" type="submit" onClick={props.btnAction} value={props.btnName}/>
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


export const CommentList = (props) => {
    
        return <p className="leading-tight font-bold text-sm">{props.comment}</p>
    
}
