import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import uuid from 'react-uuid'
import api from '../../classes/adapters'

import { Kit } from '../../classes/kits';
import { Selection } from '../../classes/selections';
import { Theme } from '../../classes/themes'
import {addSelection} from '../../actions/userCRUDActions'


import KitTitle from '../Kits/kitTitle'
import KitForm from './kitForm';



class KitContainer extends Component {

  state = {
    set_num: this.props.kit.set_num,
    setToPublic: "false",
    redirect: false
   
  }


  submitSelection = e => {
    const {themes, addSelection} = this.props
    
    e.preventDefault();
    let kitTheme = themes.body.find(e => e.api_id === this.props.theme)
    let configPackage = {
      kit: {...this.props.kit},
      isPublic: this.state.setToPublic,
      theme: {...kitTheme}
    }
    addSelection(configPackage)
    this.setRedirect()    
  }  

  selectPublic = (e) => {
    e.preventDefault()
    this.setState({ ...this.state, setToPublic: e.target.value })
  }
  
  revealForm = () => {
    const { kit } = this.props
    
    if (kit.description == "no data") {
      return null
    } else {
      return <KitForm key={uuid()}  kitId={kit.set_num} publicState={this.state.setToPublic} selectPublic={this.selectPublic} submitForm={this.submitSelection} />
    } 
  }
  
  //BUILD OUT KIT DISPLAY TO INCLUDE SELECTION SUBMISSION FUNCTIONALITY.
  render() {
    const { kit } = this.props
    
    return(
      <>
             <div key={uuid()}>
             {this.renderRedirect()}
              <div  id={kit.set_num} className="kit-dropdown-btn px-4">
                <KitTitle key={uuid()} name={kit.name} description={kit.description}/>
                {this.revealForm()}
              </div>
            </div>
          </>
      )
  }

  setRedirect = () => {
    this.setState({...this.state, redirect: true})
  }
  
  renderRedirect = () => {
    if (this.state.redirect) {  
    return <Redirect to="collection" />
    }
  }

}

const mapStateToProps = (state) => {
  return {
    themes: state.themes,
    kits: state.kits
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addSelection: (selectionData => {
      dispatch(addSelection(selectionData))
    })
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(KitContainer);