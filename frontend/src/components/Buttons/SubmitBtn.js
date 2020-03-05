import React from 'react'

const SubmitBtn = (props) => {
    return <input className="submit-btn w-1/2 mr-2 my-2" id="login-btn" type="submit" onClick={props.btnAction} value={props.btnName}/>
}
export default SubmitBtn;