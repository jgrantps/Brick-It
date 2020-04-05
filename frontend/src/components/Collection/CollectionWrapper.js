import React, { Component } from 'react'
import { connect } from 'react-redux'
import uuid from 'react-uuid'
import { SelectionTileWrapper, TitleHeading } from '../Elements/Elements'

class CollectionWrapper extends Component {

    render() {
        const { reduxType} = this.props
        const {category, categoryId, [reduxType]:{body: collectionSet}} = this.props
        
        
        var kitsInCategory;
        if (reduxType == 'community') {
            kitsInCategory  = collectionSet.filter(selection => selection.data.attributes.user.id == categoryId )
        }else{
            kitsInCategory  = collectionSet.filter(selection => selection.included.find(e=>e.type == 'theme').attributes.api_id == categoryId )
        }
        


    let fromattedKits  = kitsInCategory.map(selection =>{    
            return (
                <div key={uuid()}>
                    <SelectionTileWrapper selection ={selection}/>
                </div>
            )
        })        

        return(
            <div key={uuid()} className="flex  flex-col mx-8 border-b border-gray-300">
             <TitleHeading name={category.name} headingClass="collection-theme-title"/>
            <div  className="flex flex-wrap">
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