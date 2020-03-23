import React, { Component } from 'react'
import { connect } from 'react-redux'
import uuid from 'react-uuid'
import { TitleHeading, SelectionImage, TileWrapper } from '../Elements/Elements'
import CommentContainer from '../../containers/CommentContainer'

class CollectionWrapper extends Component {
    
    publicTag = (isPublic) => {
        if (isPublic){
            this.setClass(isPublic)
            return (
                <div>
                    <h2 className="text-green-700 font-bold">PUBLIC</h2>
                </div>
            )
        }
    }

    setClass = (isPublic = false) => {
      return  isPublic ? "bg-blue-100 w-1/3 flex flex-col m-4 px-6" : "rounded-lg  w-1/3 flex flex-col m-4 px-6 "
    }
    
    render() {
        
        const {theme} = this.props
        let themeId = Object.keys(theme)[0]
        let themeTitle = theme[themeId][0].included.find(e => e.type == 'theme').attributes.name
        
        let kitCollection  = theme[themeId].map(unit =>{
            const {attributes: { kit, public: isPublic}} = unit.data
            let classColor = this.setClass(isPublic) 
            
            return (
                
                <div key={uuid()}>
                <TileWrapper unit={kit} comments={unit.data} isPublic={isPublic}/>
                </div>
            
            )
        })        

        return(
            <div key={uuid()} className="border-b border-gray-300">
            <h2 className="font-bold leading-tight uppercase py-4 text-2xl">{themeTitle}</h2>
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