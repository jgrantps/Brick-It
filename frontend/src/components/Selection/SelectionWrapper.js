import React from 'react'
import uuid from 'react-uuid'
import {SelectionTitle} from './SelectionTitle'
import {SelectionImage} from './SelectionImage'
import CommentContainer from '../../containers/CommentContainer'

const SelectionWrapper = (props) => {
    let theme = Object.keys(props.selection)[0]
    let selection = props.selection[theme];
    
return (
    <div key={uuid()} className=" rounded-lg bg-gray-100 w-1/3 flex flex-col m-4 px-6 shadow">
        <SelectionTitle name={selection.name} />
        <SelectionImage image={selection.set_img_url} alt={selection.name} />
        <CommentContainer selection={selection} />
    </div>
)
}

export default SelectionWrapper;