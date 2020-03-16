import React, { Component } from 'react'
import NavContainer from './NavContainer'
import api from '../classes/adapters';
import { Theme } from '../classes/themes';
import ThemeUI from '../components/Catalogue/themeUI'
import ThemeTile from '../components/Catalogue/themeTile'
import { Kit } from '../classes/kits';
import uuid from 'react-uuid'

class CatalogueContainer extends Component {

    state = {
        themeList: []
    }
    
    handleLetterSelect = (e) => {
        e.preventDefault()

        let letter = e.target.id;
        let CollectionArray = Theme.allIncludedThemes.filter(theme => ( theme.children.length > 0 ));
        
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
       let ee = [...specifiedCollection]
       
        this.setState({...this.state, themeList: [...specifiedCollection]})
    }
    
    //CAPTURE AND PROCESS SELECTED THEME TO RETREIVE KITS.
    
    convertThemeToTile = (theme) => {
        
        return <ThemeTile key={uuid()}  sessionProps={this.props} theme={theme} children={theme.children} kits={this.state.kitList}/>
    }
    
    render() {
        let themeList = this.state.themeList.map(theme => this.convertThemeToTile(theme))    
        return(
            <>
            <NavContainer props={this.props} />
            <div id="theme-wrapper" className="pt-12">
                <ThemeUI handleOnSubmit={this.handleLetterSelect} />
                {themeList}
            
            </div>
            </>
        )
    }
    //OUTSIDE OF RENDER
    
    componentDidMount() {
        this.fetchAllThemes();
    }
    
    fetchAllThemes = () => {
        if (Theme.allIncludedThemes.length == 0) {
            api.retrieveThemes()
            .then(resp => this.loadThemes(resp))
        }
    }
    
    //ASSIGN REBRICKABLE API_ID TO A SPECIFIED ID ATTRIBUTE; DEFAULT ID SET TO 'UNDEFINED'.
    loadThemes = (data) =>  {
        data.results.map(theme => { 
           let formattedTheme = {...theme, api_id: theme.id}
           new Theme(formattedTheme);
        })
    }
    
}
export default CatalogueContainer;