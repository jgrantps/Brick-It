import React, { Component } from 'react'
import { connect } from 'react-redux'
import uuid from 'react-uuid'
import { SelectionTileWrapper, TitleHeading } from '../Elements/Elements'

class CollectionWrapper extends Component {

    render() {
        
        const {theme, collection:{body: collectionSet}} = this.props
    
        let themeSelections = collectionSet.filter(selection => selection.included.find(e => e.type == 'theme').attributes.api_id == theme.api_id)
        let kitsInTheme  = themeSelections.map(selection =>{    
            return (
                <div key={uuid()}>
                    <SelectionTileWrapper selection ={selection}/>
                </div>
            
            )
        })        

        return(
            <div key={uuid()} className="border-b border-gray-300">
             <TitleHeading name={theme.name} headingClass="collection-theme-title"/>
            <div  className="flex">
                {kitsInTheme}
            </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        collection: state.collection,
        selections: state.selections,
        kits: state.kits,
        themes: state.themes,
        comments: state.comments
    }
}
export default connect(mapStateToProps)(CollectionWrapper);