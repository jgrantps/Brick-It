import React from 'react'
import uuid from 'react-uuid'

const SelectThemeBtn = ({child, handlOnClick}) => {
    return (
        <button key={uuid()} className="theme-tile" id={child.api_id} onClick={handlOnClick}>
            <h2 className="text-lg text-gray-700 pb-2 pointer-events-none">
            {child.name}
            </h2>
            <h3 className="text-black font-light leading-tight text-xs pointer-events-none">BROWSE SETS</h3> 
        </button>
    )
}

export default SelectThemeBtn;