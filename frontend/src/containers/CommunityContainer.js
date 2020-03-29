import React, { Component } from 'react'
import NavContainer from './NavContainer'
import uuid from 'react-uuid'

import CommunityCollectionWrapper from '../components/Community/CommunityCollectionWrapper'
import CollectionWrapper from '../components/Collection/CollectionWrapper'
import {loadCommunityData} from '../actions/adjusterSelections'
import { connect } from 'react-redux'

class CommunityContainer extends Component {
    
    componentDidMount() {
        const {community} = this.props
        
        if (!community.bulkload) {
            
            this.props.loadCommunityData()
        }
    }

    communityUsers = () => {
        const {community:{body: collectionSet}} = this.props
        
        var currentUserList = []
        var currentUserIdList = []
        collectionSet.map(selection => {
            let user = selection.data.attributes.user
            currentUserList.push(user)
            currentUserIdList.push(user.id)
        })

        let uniqueCurrentUserIdList = [...new Set(currentUserIdList)]
        let uniqueCurrentUserList = []
        uniqueCurrentUserIdList.map(userId => uniqueCurrentUserList.push(currentUserList.find(user => user.id == userId )))

        return uniqueCurrentUserList.map(user => {return(<CollectionWrapper key={uuid()} category = {user} categoryId={user.id} reduxType="community" />  )})
        // return(
        //     publicUsers.map(user => {
        //         let selections= this.compileSelections(user.id)
        //         return (
        //             <div key={uuid()}>
        //                 <CommunityCollectionWrapper selectionList = {selections} user={user} />
        //             </div>
        //         )
        //     })
        // )
    }
    
    compileSelections = (userId) => {
        const {community} = this.props
        let selectionList = community.body.filter(unit => unit.data.attributes.user.id == userId)
        return selectionList
        
    }
    
    
    render() {

        const {userId} = this.props.match.params    
        const {community} = this.props

        return(
            <>
            <NavContainer props={this.props} />
            <div className="pt-12">
                {/* <h2>filler for the community container - check the REDUX!!!</h2> */}
                {this.communityUsers()}
            </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        collection: state.collection,
        selections: state.selections,
        themes: state.themes,
        comments: state.comments,
        kits: state.kits,
        community: state.community

    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadCommunityData: () => {dispatch(loadCommunityData())}
      }
}




export default connect(mapStateToProps, mapDispatchToProps)(CommunityContainer);