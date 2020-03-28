import React, { Component } from 'react'
import NavContainer from './NavContainer'
import uuid from 'react-uuid'

import CommunityCollectionWrapper from '../components/Community/CommunityCollectionWrapper'
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
        const {community:{publicUsers}} = this.props
        
        return(
            publicUsers.map(user => {
                let selections= this.compileSelections(user.id)
                return (
                    <div key={uuid()}>
                        <CommunityCollectionWrapper selectionList = {selections} user={user} />
                    </div>
                )
            })
        )
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