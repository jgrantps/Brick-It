import React, { Component } from 'react'
import { connect } from 'react-redux'

import NavContainer from './NavContainer'
import { loadThemes } from '../actions/reBrickableAPIAccess'
import service from '../classes/service'
import ThemeUI from '../components/Catalogue/themeUI'
import ThemeTile from '../components/Catalogue/themeTile'
import {LoadingSignal} from '../components/Elements/Elements'

import uuid from 'react-uuid'

class CatalogueContainer extends Component {

    state = {
        childrenList: []
    }

    
    handleLetterSelect = (e) => {
        const {themes} = this.props
        e.preventDefault()
        let letter = e.target.id; 
        //STORE COLLECTION OF SPECIFIED THEMES IN LOCAL COMPONENT STATE TO RENDER.
        let specifiedCollection = themes.parents.filter(theme => theme.name[0] == letter)
              
    
        this.setState({
            childrenList: [...specifiedCollection]
        })
    }
    
    //CAPTURE AND PROCESS SELECTED THEME TO RETREIVE KITS.
    convertThemeToTile = (parent) => {
        let themeChildren = service.findChildrenThemes(parent, this.props.themes.body )
        return <ThemeTile key={uuid()}  sessionProps={this.props} theme={parent} children={themeChildren} />
    }
    
    render() {
        let collectedThemes = this.state.childrenList.map(theme => this.convertThemeToTile(theme))    
        return(
            <>
            <NavContainer props={this.props} />
            <div id="flex flex-col justify-center w-auto" className="pt-4 mt-16">
                <ThemeUI handleOnSubmit={this.handleLetterSelect} />
                {collectedThemes}
                {LoadingSignal(this.props.themes.loading)}

            
            </div>
            </>
        )
    }
    //OUTSIDE OF RENDER
    
    componentDidMount() {
        if (!this.props.themes.loaded && !this.props.themes.loading){
            this.props.loadThemes();
        }
    }   
}

const mapDispatchToProps = dispatch => {
    return {
        loadThemes: () => {dispatch(loadThemes())}
      }
}


const mapStateToProps = (state) => {
    return {
        themes: state.themes,
        loading: state.loading,   
        collection: state.collection
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CatalogueContainer);