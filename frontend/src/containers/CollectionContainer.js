import React, { Component } from 'react'
import { connect } from 'react-redux'
import NavContainer from './NavContainer'
import uuid from 'react-uuid'
import {loadUserComments} from '../actions/adjusterSelections'

import SelectionWrapper from '../components/Selection/SelectionWrapper'
import CollectionWrapper from '../components/Collection/CollectionWrapper'
import { SelectionPrompt, TitleHeading } from '../components/Elements/Elements'




class CollectionContainer extends Component {

    loadingSignal = () => {
        if (this.props.loading){
            return <h1 className="text-2xl">I AM LOADING!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!</h1>
        }
    }


    componentDidMount() {
        const {comments} = this.props
        if (!comments.bulkLoad) {
            this.props.loadUserComments()
        }
    }

selectionSet = () => {
    
   return( this.props.selections.body.map(theme => {
       
       let specificTheme = this.props.themes.body.find(themeInstance => themeInstance.api_id == Object.keys(theme)[0])
       return(theme[specificTheme.api_id].map(selection => {
        
       
            return (
                <div key={uuid()} className="flex flex-col w-auto">
                    <TitleHeading name={specificTheme.name} headingClass="font-bold leading-tight text-xl"/>
                    <SelectionWrapper  selection={selection} /> 
                </div>
            )
        }))
    }))
}    

currentSelections = () => {

    if (this.props.selections.body.length > 0) {
        return this.selectionSet()              
    } else { 
        return (
            <SelectionPrompt prompt="Please Make A Selection" />
            )   
        }
            
    }

    render() { 
        const {userId} = this.props.match.params 

        let loadedCollection = this.props.collection.body.map(theme => {
            return <CollectionWrapper key={uuid()} theme ={theme} />
        })
        return(
            <>
            <NavContainer props={this.props} />
            <div className="pt-12">
                <h2 className="text-4xl border-b-2 border-gray-700 mx-8 mb-4">Recent Selections:</h2>
                {this.loadingSignal()}
                <div className="flex flex-wrap  bg-blue-100">
                    {this.currentSelections()}
                    
                </div>
                <div>
                    {loadedCollection}
                </div>
            </div>
            </>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadUserComments: () => {dispatch(loadUserComments())}
      }
}

const mapStateToProps = (state) => {
    return {
        collection: state.collection,
        selections: state.selections,
        themes: state.themes,
        comments: state.comments,
        kits: state.kits

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CollectionContainer);