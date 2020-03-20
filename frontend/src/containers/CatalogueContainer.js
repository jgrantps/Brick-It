import React, { Component } from 'react'
import { connect } from 'react-redux'

import NavContainer from './NavContainer'
import { loadThemes } from '../actions/adjusterSelections'
import service from '../classes/service'
import { Theme } from '../classes/themes';
import ThemeUI from '../components/Catalogue/themeUI'
import ThemeTile from '../components/Catalogue/themeTile'

import uuid from 'react-uuid'

class CatalogueContainer extends Component {

    state = {
        themeList: []
    }

    loadingSignal = () => {
        if (this.props.loading){
            return <h1 className="text-2xl">I AM LOADING!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!</h1>
        }
    }
    
    handleLetterSelect = (e) => {
        const {themes} = this.props
        e.preventDefault()
        let letter = e.target.id;
        let CollectionArray = []
        themes.map(theme => {
            let parentArray = service.filterChildren(theme, themes)
            if (parentArray.length > 0) {
                CollectionArray.push((themes.find(theme => theme.api_id == parentArray[0].parent_id)))
            }
        });

        
        let sortedCollection = CollectionArray.sort(function(a, b) {
            var nameA = a.name.toUpperCase();
            var nameB = b.name.toUpperCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
        
        //STORE COLLECTION OF SPECIFIED THEMES IN LOCAL COMPONENT STATE TO RENDER.
        let specifiedCollection = sortedCollection.filter(theme => theme.name[0] == letter)
              
    
        this.setState({
            themeList: [...specifiedCollection]
        })
    }
    
    //CAPTURE AND PROCESS SELECTED THEME TO RETREIVE KITS.
    convertThemeToTile = (theme) => {
        return <ThemeTile key={uuid()}  sessionProps={this.props} theme={theme} children={service.filterChildren(theme, this.props.themes)} />
    }
    
    render() {
        
        let collectedThemes = this.state.themeList.map(theme => this.convertThemeToTile(theme))    
        return(
            <>
            <NavContainer props={this.props} />
            <div id="theme-wrapper" className="pt-12">
                {this.loadingSignal()}
                <ThemeUI handleOnSubmit={this.handleLetterSelect} />
                {collectedThemes}
            
            </div>
            </>
        )
    }
    //OUTSIDE OF RENDER
    
    componentDidMount() {
        if (this.props.themes.length == 0){
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
        loading: state.loading   
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CatalogueContainer);