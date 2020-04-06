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
             
            <div id="user-container" className="welcome-container">
                
                {LoadingSignal(this.props.collection.loading)}
                <h2>Welcome {name}!</h2>
                    <br></br>
                <p className="max-w-xl">
                    Brickit is an app designed to help users of the rebrickable Lego community connect and share ideas.
                    Users build their own collection of their favorite lego sets from the catalogue, and then are able to comment on their selections, as well as share them with the brickit community should they choose.
                    <br></br>
                    <br></br>
                    Click on the "catalogue" tab to browse the lego catalogue via the Rebrickable API.  You can choose which kits added to your collection are public - making them available for other users to comment.
                    <br></br>
                    <br></br>
                    Click on the "Collection" tab to browse your own collection of leg kits.  Kits added to your collection in your current session will appear at the top of the page.
                    <br></br>
                    <br></br>
                    Click on the "Community" tab to see what other Brickit users are choosing for their collections!  Comment on their collected kits to let them know what you think. 
                </p>
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