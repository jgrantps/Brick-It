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
            this.props.addAllSelections()
        }   
    }
        
    filterPayload = (payload, theme) => {
      return  payload.filter(selection => selection.included[1].attributes.api_id == theme)
    }

    loadingSignal = () => {
        if (this.props.loading){
            return <h1 className="text-2xl">I AM LOADING!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!</h1>
        }
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
                {this.loadingSignal()}
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
        addCollectionComment: (commentData) => {dispatch(addCollectionComment(commentData))},
        addAllSelections: () => {dispatch(addAllSelections())}
      }
}

const mapStateToProps = (state) => {
    return {
        collection: state.collection,
        selection: state.selections,
        loading: state.loading
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CollectionContainer);