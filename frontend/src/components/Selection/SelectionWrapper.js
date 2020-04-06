import React, { Component } from 'react'
import uuid from 'react-uuid'


import {SelectionTileWrapper} from '../Elements/Elements'

class SelectionWrapper extends Component {
    
    render () {
        const {selection} = this.props
        return (
            <div key={uuid()} >
                <SelectionTileWrapper unit={selection.kit} comments={selection.selection} isPublic={selection.selection.public}/>
            </div>
        )
    }
}

export default SelectionWrapper; 