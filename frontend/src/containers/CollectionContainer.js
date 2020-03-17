import React, { Component } from 'react'
import { connect } from 'react-redux'
import NavContainer from './NavContainer'
import api from '../classes/adapters'

import {addCollectionComment, addAllSelections} from '../actions/adjusterSelections'

class CollectionContainer extends Component {


    componentDidMount() {
        //FETCH ALL SELECTIONS FROM THE USER'S DATABASE.
        api.fetchAllSelections(window.localStorage.token)
        .then(resp =>  this.handleSelectionPayload(resp))
    }

    // MAP FETCHED SELECTIONS TO REDUX AND COLLECTION CONTAINER COMPONENTS.
    handleSelectionPayload = (payload) => {
        var reduxPayload = []
        var payloadThemes = []
        payload.map(selection => payloadThemes.push(selection.included[1].attributes.api_id))
        let uniquePayloadThemes = [...new Set(payloadThemes)];
        
        
        uniquePayloadThemes.map(theme => {
            reduxPayload.push({[theme]: this.filterPayload(payload, theme)})
        })

        console.log(reduxPayload)
        
        
        
        payload.sort(function(a, b) {
            var unitA = a.included[1].attributes.api_id; // ignore upper and lowercase
            var unitB = b.included[1].attributes.api_id; // ignore upper and lowercase
            if (unitA < unitB) {
                return -1;
            }
            if (unitA > unitB) {
                return 1;
            }
            return 0;
        });
        
        // payload.map(selection => {
            
            // })
        }
        
        filterPayload = (payload, theme) => {
      return  payload.filter(selection => selection.included[1].attributes.api_id == theme)
    }




    render() {
        
    const {userId} = this.props.match.params    
       
    return(
            <>
            <NavContainer props={this.props} />
            <div className="pt-12">
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


export default connect(null, mapDispatchToProps)(CollectionContainer);