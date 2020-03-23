import React, { Component } from 'react'
import uuid from 'react-uuid'


import {TileWrapper} from '../Elements/Elements'

class SelectionWrapper extends Component {
    
    render () {
        const {selection} = this.props
        return (
            <div key={uuid()} >
                <TileWrapper unit={selection.kit} comments={selection.selection} isPublic={selection.selection.public}/>
            </div>
        )
    }
}

export default SelectionWrapper; 