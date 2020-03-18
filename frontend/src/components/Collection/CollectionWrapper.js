import React, { Component } from 'react'
import { connect } from 'react-redux'
import uuid from 'react-uuid'
import { TitleHeading, SelectionImage } from '../Elements/Elements'
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
      return  isPublic ? "rounded-lg bg-gray-500 w-1/3 flex flex-col m-4 px-6 shadow" : "rounded-lg bg-green-100 w-1/3 flex flex-col m-4 px-6 shadow"
    }
    
    render() {
        
        const {theme} = this.props
        let themeId = Object.keys(theme)[0]
        let themeTitle = theme[themeId][0].included.find(e => e.type == 'theme').attributes.name
        
        let kitCollection  = theme[themeId].map(unit =>{
            const {attributes: { kit, public: isPublic, comments}} = unit.data
            let classColor = this.setClass(isPublic) 
            
            return (
                <div className={classColor}>
                    <TitleHeading name={kit.name} />
                    {this.publicTag(isPublic)}
                    <SelectionImage name={kit.name} image={kit.set_img_url} />
                    <CommentContainer comments={comments}/>
                </div>
            )
        })

        

        return(
            <div key={uuid()}>
            <h2>{themeTitle}</h2>
                {kitCollection}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        collection: state.collection
    }
}
export default connect(mapStateToProps)(CollectionWrapper);