import React, { Component } from 'react'
import { connect } from 'react-redux'
import uuid from 'react-uuid'
import { SelectionTileWrapper, TitleHeading } from '../Elements/Elements'

class CollectionWrapper extends Component {

    render() {
        const { reduxType} = this.props
        const {theme, [reduxType]:{body: collectionSet}} = this.props
        
        
        
        let kitsInTheme  = collectionSet.filter(selection => selection.included.find(e=>e.type == 'theme').attributes.api_id == theme.api_id )
        


    let fromattedKits  = kitsInTheme.map(selection =>{ 
        
           
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
                {fromattedKits}
            </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        collection: state.collection,
        selections: state.selections,
        community: state.community,
        kits: state.kits,
        themes: state.themes,
        comments: state.comments
    }
}
export default connect(mapStateToProps)(CollectionWrapper);