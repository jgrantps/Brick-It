import React, { Component } from 'react'
import { connect } from 'react-redux'
import NavContainer from './NavContainer'
import api from '../classes/adapters'

import {addCollectionComment, addAllSelections} from '../actions/adjusterSelections'
import SelectionWrapper from '../components/Collection/SelectionWrapper'



class CollectionContainer extends Component {


    componentDidMount() {
        const { collection } = this.props
        //FETCH ALL SELECTIONS FROM THE USER'S DATABASE.
        if (collection.length < 1) {
            
            api.fetchAllSelections(window.localStorage.token)
            .then(resp =>  this.handleFetchPayload(resp))
        }
        
    }

    // MAP FETCHED SELECTIONS TO REDUX AND COLLECTION CONTAINER COMPONENTS.
    handleFetchPayload = (payload) => {
        var reduxPayload = []
        var payloadThemes = []
        payload.map(selection => payloadThemes.push(selection.included[1].attributes.api_id))
        let uniquePayloadThemes = [...new Set(payloadThemes)];
        
        uniquePayloadThemes.map(theme => {
            reduxPayload.push({[theme]: this.filterPayload(payload, theme)})
        })
        this.props.addAllSelections(reduxPayload)
       
    }
        
    filterPayload = (payload, theme) => {
      return  payload.filter(selection => selection.included[1].attributes.api_id == theme)
    }




    render() {
        
    const {userId} = this.props.match.params  
    
    let currentSelections = this.props.selection.map(selection => {
        return <SelectionWrapper selection={selection} />
    })
       
    return(
            <>
            <NavContainer props={this.props} />
            <div className="pt-12">
                <h2>Recent Selections:</h2>
                <div className="flex bg-blue-500">
                {currentSelections}
                </div>
                <h2>this is the COLLECTION from the User {userId}</h2>
            </div>
            </>
        
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addCollectionComment: (commentData => {
          dispatch(addCollectionComment(commentData))
        }),

        addAllSelections: (selectionPayload => {
            dispatch(addAllSelections(selectionPayload))
        })
      }
}

const mapStateToProps = (state) => {
    return {
        collection: state.collection,
        selection: state.selections
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CollectionContainer);