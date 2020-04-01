import React, { Component } from 'react'
import { connect } from 'react-redux'
import NavContainer from './NavContainer'
import uuid from 'react-uuid'
import {loadUserComments, loadCommunityData, updateCommunityComments} from '../actions/adjusterSelections'

import CollectionWrapper from '../components/Collection/CollectionWrapper'
import { SelectionPrompt, LoadingSignal } from '../components/Elements/Elements'




class CollectionContainer extends Component {

    componentDidMount() {
        const {comments, loadCommunityData, user:{ focusStatus }, updateCommunityComments} = this.props
        
        if (!comments.bulkLoad) {
            this.props.loadUserComments()
        }

        // this.updater = setInterval(() => { updateCommunityComments(this.communityCommentList()) }, 3000)
        // if (focusStatus) {
        // }
    }


    componentWillUnmount() {
        // clearInterval(this.updater)
    }

    // communityCommentList = () => {
        
    //     const {comments:{body: commentSet}} = this.props
    //     let commentIdSet = [];
    //     commentSet.map(comment => commentIdSet.push(comment.id))
    //     return {currentSet: commentIdSet}
    // }

    selectionSet = () => {
        const {selections:{body: collectionSet}} = this.props
        //BUILDS UNIQUE THEME LIST OUT OF ALL THE SELECTIONS IN THE USER'S COLLECTION UPON LOGIN.
        var currentThemeList = []
        var currentThemeIdList = []
        collectionSet.map(selection => {
            let theme = selection.included.find(e => e.type == 'theme').attributes
            currentThemeList.push(theme)
            currentThemeIdList.push(theme.api_id)
        })

        let uniqueCurrentThemeIdlist = [...new Set(currentThemeIdList)]
        let uniqueCurrentThemeList = []
        uniqueCurrentThemeIdlist.map(themeId => uniqueCurrentThemeList.push(currentThemeList.find(theme=> theme.api_id == themeId)))

        return uniqueCurrentThemeList.map(theme => {return(<CollectionWrapper key={uuid()} category={theme} categoryId={theme.api_id} reduxType="selections"/>)})
    } 
    
    
    collectionSet = () => {
        const {collection:{body: collectionSet}} = this.props
        //BUILDS UNIQUE THEME LIST OUT OF ALL THE SELECTIONS IN THE USER'S COLLECTION UPON LOGIN.
        var currentThemeList = []
        var currentThemeIdList = []
        collectionSet.map(selection => {
            let theme = selection.included.find(e => e.type == 'theme').attributes
            currentThemeList.push(theme)
            currentThemeIdList.push(theme.api_id)
        })

        let uniqueCurrentThemeIdlist = [...new Set(currentThemeIdList)]
        let uniqueCurrentThemeList = []
        uniqueCurrentThemeIdlist.map(themeId => uniqueCurrentThemeList.push(currentThemeList.find(theme=> theme.api_id == themeId)))

        return uniqueCurrentThemeList.map(theme => {return(<CollectionWrapper key={uuid()} category={theme} categoryId={theme.api_id} reduxType="collection" />)})   
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

        return(
            <>
            <NavContainer props={this.props} />
            <div className="pt-12">
                <h2 className="text-4xl border-b-2 border-gray-700 mx-8 mb-4">Recent Selections:</h2>
                
                {LoadingSignal(this.props.selections.loading)}
                <div className="flex flex-wrap  bg-blue-100">
                    {this.currentSelections()}
                </div>
                <div>
                    {this.collectionSet()}
                </div>
            </div>
            </>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadUserComments: () => {dispatch(loadUserComments())},
        loadCommunityData: () => {dispatch(loadCommunityData())},
        updateCommunityComments: (e) => {dispatch(updateCommunityComments(e))}
      }
}

const mapStateToProps = (state) => {
    return {
        collection: state.collection,
        selections: state.selections,
        user: state.user,
        themes: state.themes,
        comments: state.comments,
        kits: state.kits,
        // focus: state.collectionfocus

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CollectionContainer);