import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TitleHeading, SelectionImage } from '../Elements/Elements'
import CommunityCommentContainer from '../../containers/CommunityCommentContainer'

class CommunityTileWrapper extends Component {

    render() {
        const {comments, selectionList: {data: selection}} = this.props
        let selectionId = selection.id 
        let kitName = selection.attributes.kit.name
        let image = selection.attributes.kit.set_img_url
      //CHANGE COMMENTS TO BE COMING FROM THE COMMENT STORE!!!!!
        // let comments = selection.data.attributes.comments
        let specificComments = comments.body.filter(comment => comment.data.attributes.selection.id == selection.id)
        
    
        
        return(
            <div id={selectionId} className="community-tile">
                <SelectionImage name={kitName} image={image} />
                <TitleHeading name ={kitName} />
                <CommunityCommentContainer currentSelection={specificComments} selectionId={selectionId} />
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        collection: state.collection,
        selections: state.selections,
        kits: state.kits,
        themes: state.themes,
        comments: state.comments
    }
}

export default connect(mapStateToProps)(CommunityTileWrapper)