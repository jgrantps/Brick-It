import React, { Component } from 'react'
import uuid from 'react-uuid'
import {TitleHeading} from '../../components/Elements/Elements'
import CommunityTileWrapper from './CommunityTileWrapper'
import { connect } from 'react-redux'

class CommunityCollectionWrapper extends Component {

    render () {
        const {user, selectionList} = this.props

        let userSelections = selectionList.map(selection=>{
            
            return(
                <div key={uuid()} className="w-64 mx-4">
                   <CommunityTileWrapper selectionList={selection} />
                </div>
            )
        })
        
        // let localUser = this.props.community.body.find(unit => unit.data.attributes.user.id == user).data.attributes.user



        return (
            <div key={uuid()} className="flex flex-col border-b border-gray-300">
                <TitleHeading name={user.name} headingClass="collection-theme-title"/>
                <div  className="flex flex-wrap">
                    {userSelections}
                </div>
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
        comments: state.comments,
        community: state.community
    }
}

export default connect (mapStateToProps)(CommunityCollectionWrapper)