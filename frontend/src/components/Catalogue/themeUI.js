import React, { Component } from 'react';
import LetterBtn from './letterBtn'

class ThemeUI extends Component {
    
    processLetters = (letter) => {
      const  {handleOnSubmit} = this.props
        return <LetterBtn letter={letter} handleOnLetterSubmit={handleOnSubmit}/>
    };
    
    render() {
        let letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
        let formattedLetters = letters.map(letter => this.processLetters(letter));
        
        
        return (
            <>
            <div className="flex align-center justify-center">
               <div className="flex flex-col w-2/3 justify-center">
                   <h1 className="text-center text-2xl font-bold py-4">Select A Theme from the Catalogue</h1>
                    <div className="flex flex-wrap justify-center">
                        {formattedLetters}
                    </div>
                   </div> 
            </div>
            </>
        )
    }
}

export default ThemeUI;