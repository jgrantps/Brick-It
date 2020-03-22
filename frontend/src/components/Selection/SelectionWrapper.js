import React from 'react'
import uuid from 'react-uuid'

import CommentContainer from '../../containers/CommentContainer'
import {SelectionImage, TitleHeading} from '../Elements/Elements'

const SelectionWrapper = (props) => {
    const {selection} = props
return (

    <div key={uuid()} className=" rounded-lg bg-gray-100 w-auto flex flex-col m-4 px-6 shadow">
       
        <TitleHeading name={selection.name} />
        <SelectionImage image={selection.set_img_url} alt={selection.name} />
        <CommentContainer currentSelection={selection} />
    </div>
)
}

export default SelectionWrapper; 