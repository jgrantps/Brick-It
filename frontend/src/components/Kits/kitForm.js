import React from 'react'

const KitForm = ({publicState, kitId, selectPublic, submitForm}) => {
    
    return (
        <form  selected={kitId} onSubmit={submitForm} >
            <div className="form-check">
                <label>
                    <input
                    type="radio"
                    name="react-tips"
                    value= "false"
                    selected = {kitId}
                    checked={ publicState === "false"}
                    onChange={selectPublic}
                    className="form-check-input"
                    />
                Private
                </label>
            </div>

            <div className="form-check">
                <label>
                    <input
                    type="radio"
                    name="react-tips"
                    selected ={kitId}
                    value= "true"
                    checked={publicState === "true"}
                    onChange={selectPublic}
                    className="form-check-input"
                    />
                Public
                </label>
            </div>

            <div className="form-group">
                <button className="submit-btn py-1 my-2 text-gray-600 hover:bg-gray-600 hover:text-gray-100" type="submit">
                    Select
                </button>
            </div>
        </form>
    )
}
export default KitForm;