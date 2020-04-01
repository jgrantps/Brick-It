import React, { Component } from 'react';
import { connect } from 'react-redux';


import { loadUserCollection } from '../actions/adjusterSelections'
import NavContainer from './NavContainer'

class UserContainer extends Component {

    componentDidMount() {
        const { collection } = this.props

        //FETCH ALL SELECTIONS FROM THE USER'S DATABASE.
        if (!collection.loaded) {
            this.props.loadUserCollection()
        }   
    }
    
    loadingSignal = () => {
        const { collection } = this.props
        if (collection.loading){
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
        loadUserCollection: () => {dispatch(loadUserCollection())}
      }
}

const mapStateToProps = (state) => {
    return {
        collection: state.collection,
        selection: state.selections,
        loading: state.loading,
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (UserContainer);