import React, { Component } from 'react';
import ThemeTile from './themeTile'

class ThemeList extends Component {
    render() {
        let tileList = this.props.themes
        let bob = tileList.name
        
       
        return(
            {tileList}
            // {tileList}
        )
    }
}
export default ThemeList