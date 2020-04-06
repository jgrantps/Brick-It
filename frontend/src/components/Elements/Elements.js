import React from 'react'
import uuid from 'react-uuid'
import DeleteComment from '../../assets/images/deleteCommentSVG'
import service from '../../classes/service'
import CommentContainer from '../../containers/CommentContainer'
import loading from '../../assets/images/loading.gif'

export const TitleHeading = (props) => {
    return <h2 className="font-semibold text-xl uppercase pt-2 ">{props.name}</h2>
}

export const TextField = (props) => {
    return <input type={props.type} onChange={props.trackChange} value={props.value} name={props.name} id={props.id} className="submit-btn"/>
}

export  const SelectionPrompt = (props) => {
    return (
        <div className="mx-8 prompt-wrapper">
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
    return <input className="submit-btn w-1/2 mr-2 my-2" id={props.btnId} type="submit" onClick={props.btnAction} value={props.btnName}/>
}

const TrashCanIcon = <svg className="trash-can" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M6 2l2-2h4l2 2h4v2H2V2h4zM3 6h14l-1 14H4L3 6zm5 2v10h1V8H8zm3 0v10h1V8h-1z"/></svg>

const TrashCan = (comment, ) => {
    if (service.currentUser().id == comment.user.id) {
        return TrashCanIcon
    }
}

export const SelectionTileWrapper = (props) => {
    const {data:{id, attributes:{public: isPublic, kit:{name, set_img_url}}}} = props.selection
    return(
        <div key={uuid()} className={isPublic ? "bg-gray-100 w-96 max-w-sm flex flex-col content-between m-4 px-6 " : "flex flex-col border border-black rounded-lg pt-6 content-between w-96 max-w-sm m-4 px-6 "}>
        {service.publicTag(isPublic)}
        <SelectionImage name={name} image={set_img_url} />
        <TitleHeading name={name} />
        <CommentContainer currentSelectionID={id}  />
    </div> 
    )
}


export const CommentItem = (props) => {
    
    const {comment, user, handleOnClick} = props
    
    return (
        <div key={uuid()} className="flex border-b justify-between m-1 px-2 py-1">
            <div className=" flex flex-col">
                <h3 className="font-bold">{comment.user.name}:</h3>
                <h2>{comment.comment}</h2>
            </div>
            <button id={comment.id}   className="trash-can-wrapper" onClick={handleOnClick}>
                {TrashCan(comment, user)}
            </button>
        </div>
    )
}











// export const CommunityCommentList = (props) => {
    
//     const {comment, user, handleOnClick} = props
//     debugger
//     return (
//         <div key={uuid()} className="flex border-b justify-between m-1 px-2 py-1">
//             <div className=" flex flex-col">
//                 <h3 className="font-bold">{comment.data.attributes.user.name}:</h3>
//                 <h2>{comment.data.attributes.comment}</h2>
//             </div>
//             <button id={comment.data.id}   className="trash-can-wrapper" onClick={handleOnClick}>
//            {TrashCan(comment, user)}
//             </button>
//         </div>
//     )
// }


export const SelectionImage = (props) => {
    return <img src={props.image} alt={props.name} className=" h-32 w-auto object-cover"/>
}

const loadingGiphy = require("../../assets/images/loading.gif")

export const LoadingSignal = (props) => {
    if (props) {
        return (
            <div className="flex  justify-center w-auto">
                <div 
                className="flex flex-col  items-stretch w-48 h-48 " 
                style={ {
                    backgroundImage: `url("${loadingGiphy}")`,
                    backgroundPosition: 'center',
                    
                }}>
                    <p className="flex text-center  justify-center pt-4 text-sm">one moment please</p>
                </div>
            </div>
        )
    }
}