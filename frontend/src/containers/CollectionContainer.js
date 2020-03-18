import React, { Component } from 'react'
import { connect } from 'react-redux'
import NavContainer from './NavContainer'
import uuid from 'react-uuid'
import { addAllSelections } from '../actions/adjusterSelections'
import SelectionWrapper from '../components/Selection/SelectionWrapper'
import CollectionWrapper from '../components/Collection/CollectionWrapper'
import {Theme} from '../classes/themes'



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
        
        let currentSelections = this.props.selection.map(theme => {
            let specificTheme = Theme.allIncludedThemes.find(themeInstance => themeInstance.api_id == Object.keys(theme)[0])
            debugger

            let selectionSet = theme[specificTheme.api_id].map(selection => <SelectionWrapper selection={selection} /> )

            return (
                <>
                <div key={uuid()}>{specificTheme.name}</div>
                {selectionSet}
                </>
            )
            
        })
        
        let loadedCollection = this.props.collection.map(theme => {
            return <CollectionWrapper theme ={theme} />
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
                <div className="bg-green-300">
                    <h2>this is the COLLECTION from the User {userId}</h2>
                    {loadedCollection}
                </div>
            </div>
            </>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
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