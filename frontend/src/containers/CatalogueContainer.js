import React, { Component } from 'react'
import NavContainer from './NavContainer'
import api from '../classes/adapters';
import { Theme } from '../classes/themes';
import ThemeUI from '../components/Catalogue/themeUI'
import ThemeTile from '../components/Catalogue/themeTile'
import ThemeList from '../components/Catalogue/themeList'


class CatalogueContainer extends Component {

    state = {
        themeList: []
    }
    componentDidMount() {
        this.fetchAllThemes();
        }

    handleOnSubmit = (e) => {
        e.preventDefault()
        let letter = e.target.id;
        let ThemeArray = Theme.allIncludedThemes;
        let sortedThemes = ThemeArray.sort(function(a, b) {
            var nameA = a.name.toUpperCase(); // ignore upper and lowercase
            var nameB = b.name.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
          });

        let specifiedThemes = sortedThemes.filter(theme => theme.name[0] == letter)
        //ARRAY OF SPECIFIED THEMES
        this.setState({themeList: [...specifiedThemes]})
    }

    convertThemeToTile = (theme) => {
        return <ThemeTile name={theme.name} id={theme.id}/>
    }
    
    
    render() {
    let themeId = this.state.themeList.map(theme => this.convertThemeToTile(theme))
        
    return(
        <>
        <NavContainer props={this.props} />
        <div id="theme-wrapper" className="pt-12">
            <ThemeUI handleOnSubmit={this.handleOnSubmit} />
            {/* <ThemeList themeids={themeId} /> */}
            {themeId}
        </div>
        </>
        )}
//OUTSIDE OF RENDER


    fetchAllThemes = () => {
        api.retrieveThemes()
        .then(resp => this.loadThemes(resp))
    }

    loadThemes = (data) => {
        data.results.map(theme => { 
            //ASSIGN REBRICKABLE API_ID TO A SPECIFIED ID ATTRIBUTE; DEFAULT ID SET TO 'UNDEFINED'.
            let formattedTheme = {...theme, api_id: theme.id}
            new Theme(formattedTheme)})
            //returns array of THEME objects to be sorted.
        }    
    
}
export default CatalogueContainer;