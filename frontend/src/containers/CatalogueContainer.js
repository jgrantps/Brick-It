import React, { Component } from 'react'
import NavContainer from './NavContainer'
import api from '../classes/adapters';
import { Theme } from '../classes/themes';
import ThemeUI from '../components/Catalogue/themeUI'
import ThemeTile from '../components/Catalogue/themeTile'
import { Kit } from '../classes/kits';


class CatalogueContainer extends Component {

    state = {
        themeList: [],
        kitList: {}
    }
    componentDidMount() {
        this.fetchAllThemes();
        }
    

    handleOnSubmit = (e) => {
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

        let specifiedCollection = sortedCollection.filter(theme => theme.name[0] == letter)
        //STORE COLLECTION OF SPECIFIED THEMES IN LOCAL COMPONENT STATE TO RENDER.
        this.setState({...this.state, themeList: [...specifiedCollection]})
    }

    //CAPTURE AND PROCESS SELECTED THEME TO RETREIVE KITS.
    handleSelectTheme = e => {
        e.preventDefault()
        
        let theme = Theme.allIncludedThemes.find(theme => theme.api_id == e.target.id)
        if (theme) {
            api.fetchThemedKits(theme.api_id)
            .then(resp=> this.loadKits(resp, theme.api_id))
        }
    }
    
    convertThemeToTile = (theme, kits) => {
        
        return <ThemeTile key={theme.api_id} handleSelectTheme={this.handleSelectTheme} theme={theme} children={theme.children} kits={this.state.kitList}/>
    }
    render() {
        let themeList = this.state.themeList.map(theme => this.convertThemeToTile(theme))    
        console.log(this.state.kitList)
        return(
            <>
            <NavContainer props={this.props} />
            <div id="theme-wrapper" className="pt-12">
                <ThemeUI handleOnSubmit={this.handleOnSubmit} />
                {themeList}
            
            </div>
            </>
        )
    }
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
        }
        
    loadKits = (data, theme_id) => {
        let kitCollection = []
        data.results.map(kit => {
           let newKit = new Kit(kit)
           
            kitCollection.push(newKit)
        })
        this.setState({...this.state, kitList: {...this.state.kitList, [theme_id]: [...kitCollection] }})

    }
    
}
export default CatalogueContainer;