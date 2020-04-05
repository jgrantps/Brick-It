import React, { Component } from 'react';
import { connect } from 'react-redux';


import { loadUserCollection } from '../actions/bulkActions'
import NavContainer from './NavContainer'
import {LoadingSignal} from '../components/Elements/Elements'


class UserContainer extends Component {

    componentDidMount() {
        //FETCH ALL SELECTIONS FROM THE USER'S DATABASE.
        const { collection } = this.props
        if (!collection.loaded) {
            this.props.loadUserCollection()
        }   
    }
    
    render() {
        const { name} =  this.props
        return(
            <>
           <NavContainer props={this.props} /> 
             
            <div id="user-container" className=" flex items-center  h-64 border-2 border-black rounded  m-4 mt-24">
                <div className="h-20 w-20 bg-blue-500 m-4"></div>
                <div className="h-20 w-20 bg-red-500 m-4"></div>
                <div className="h-20 w-20 bg-green-500 m-4"></div>
                {/* {LoadingSignal(this.props.collection.loading)}
                <h2>welcome {name}!</h2>
                <h2>About</h2>
                <p className="w-1/2">
                    Brickit is an app designed to help users of the rebrickable Lego community connect and share ideas.
                    Users build their own collection of their favorite lego sets from the catalogue, and then are able to comment on their selections, as well as share them with the brickit community should they choose.
                    <br></br>
                    <br></br>
                    Users are able to comment on other community members' publicly available selections.
                </p> */}
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