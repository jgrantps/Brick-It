import React, { Component } from 'react'
import { connect } from 'react-redux'
import uuid from 'react-uuid'
import { TileWrapper, TitleHeading } from '../Elements/Elements'

class CollectionWrapper extends Component {

    render() {
        
        const {theme} = this.props
        let themeId = Object.keys(theme)[0]
        let themeTitle = theme[themeId][0].included.find(e => e.type == 'theme').attributes.name
        
        let kitCollection  = theme[themeId].map(unit =>{
            const {attributes: { kit, public: isPublic}} = unit.data
            
            return (
                <div key={uuid()}>
                    <TileWrapper unit={kit} comments={unit.data} isPublic={isPublic}/>
                </div>
            
            )
        })        

        return(
            <div key={uuid()} className="border-b border-gray-300">
             <TitleHeading name={themeTitle} headingClass="collection-theme-title"/>
            <div  className="flex">
                {kitCollection}
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