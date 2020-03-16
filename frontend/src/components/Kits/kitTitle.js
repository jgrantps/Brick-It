import React from 'react'
const KitTitle = (props) => {
     if (props.description) {
         return <h2 className="leading-tight text-sm font-bold py-2">{props.description}</h2>  
    } else {
        return <h2 className="leading-tight text-sm font-bold py-2">{props.name}</h2>  
    }
}
export default KitTitle