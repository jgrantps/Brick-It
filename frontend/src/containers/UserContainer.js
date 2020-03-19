import React, { Component } from 'react';
import  {Switch, Route} from 'react-router-dom';
import { connect } from 'react-redux';


import { addAllSelections } from '../actions/adjusterSelections'
import NavContainer from './NavContainer'

class UserContainer extends Component {

    componentDidMount() {
        const { collectionLoaded, selection } = this.props
        //FETCH ALL SELECTIONS FROM THE USER'S DATABASE.
        
        if (!collectionLoaded) {
            this.props.addAllSelections(selection)
        }   
    }

    render() {
        
        const { name, slug, match:{url}} =  this.props
        return(
            <>
           <NavContainer props={this.props} /> 
             
            <div id="user-container" className="user pt-12">
                <h2>welcome {name}!</h2>
                <h2>Please select from the above Menu.</h2>
            </div>
            </>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addAllSelections: (reduxSelection) => {dispatch(addAllSelections(reduxSelection))}
      }
}

const mapStateToProps = (state) => {
    return {
        collection: state.collection,
        selection: state.selections,
        loading: state.loading,
        collectionLoaded: state.collectionLoaded
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (UserContainer);