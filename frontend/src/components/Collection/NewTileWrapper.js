import React, { Component } from 'react'
import uuid from 'react-uuid'
import DeleteComment from '../../assets/images/deleteCommentSVG'
import service from '../../classes/service'
import CommentContainer from '../../containers/CommentContainer'
import Counter from '../../components/Counter'
import {ActionCable} from 'react-actioncable-provider'
import {SelectionImage, TitleHeading} from '../Elements/Elements'


class NewTileWrapper extends Component {

    handleReceivedComment = response => {
        console.log(response)
    }

    render() {
        const {data:{id, attributes:{public: isPublic, kit:{name, set_img_url}}}} = this.props.selection
        
        
        return(
            <div key={uuid()} className={isPublic ? "bg-gray-100 w-96 max-w-sm flex flex-col content-between m-4 px-6 " : "flex flex-col border border-black rounded-lg pt-6 content-between w-96 max-w-sm m-4 px-6 "}>
       {/* <ActionCable channel={{ channel: 'CommentsChannel' }} onReceived={this.handleReceivedComment}/> */}
        {service.publicTag(isPublic)}
        <Counter />
        <SelectionImage name={name} image={set_img_url} />
        <TitleHeading name={name} />
        <CommentContainer currentSelectionID={id}  />
    </div> 
    )
}
}

export default NewTileWrapper;