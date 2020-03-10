import React from 'react'

const LetterBtn = (props) => {
return <div className="theme-letter" id={props.letter} onClick={props.handleOnLetterSubmit}>
    {props.letter}
    </div>
}
export default LetterBtn;
