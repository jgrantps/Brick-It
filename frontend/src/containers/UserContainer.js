import React, { Component } from 'react';
import  {Switch, Route} from 'react-router-dom';
import { connect } from 'react-redux';


import { addAllSelections } from '../actions/adjusterSelections'
import NavContainer from './NavContainer'

class UserContainer extends Component {

    componentDidMount() {
        const { collectionLoaded } = this.props
        //FETCH ALL SELECTIONS FROM THE USER'S DATABASE.
        if (!collectionLoaded) {
            this.props.addAllSelections()
        }   
    }
    
    loadingSignal = () => {
        const { loading } = this.props
        if (loading){
            return <h1 className="text-2xl">I AM LOADING!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!</h1>
        }
    }

    render() {
        
        const { name, slug, match:{url}} =  this.props
        return(
            <>
           <NavContainer props={this.props} /> 
             
            <div id="user-container" className="user pt-12">
                <h2>welcome {name}!</h2>
                {this.loadingSignal()}
                <h2>Please select from the above Menu.</h2>
            </div>
            </>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addAllSelections: () => {dispatch(addAllSelections())}
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