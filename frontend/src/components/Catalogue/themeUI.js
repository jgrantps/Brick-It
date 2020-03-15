import React, { Component } from 'react';
import LetterBtn from './letterBtn'
import uuid from 'react-uuid'

class ThemeUI extends Component {
    
    processLetters = (letter) => {
      const  {handleOnSubmit} = this.props
        return <LetterBtn key={uuid()} letter={letter} handleOnLetterSubmit={handleOnSubmit}/>
    };
    
    render() {
        let letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
        let formattedLetters = letters.map(letter => this.processLetters(letter));
        
        
        return (
            <div className="theme-selection-ui">
                <h1 className="theme-selection-title">Browse Collection of Available Themes:</h1>
                <div className="theme-selection-wrapper">
                    {formattedLetters}
                </div> 
            </div>
        )
    }
}

export default ThemeUI;