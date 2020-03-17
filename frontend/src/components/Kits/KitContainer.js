import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import uuid from 'react-uuid'
import api from '../../classes/adapters'

import { Kit } from '../../classes/kits';
import { Selection } from '../../classes/selections';
import { Theme } from '../../classes/themes'
import {addSelection} from '../../actions/adjusterSelections'


import KitTitle from '../Kits/kitTitle'
import KitForm from './kitForm';



class KitContainer extends Component {

  state = {
    set_num: this.props.kit.set_num,
    setToPublic: "false",
    redirect: false
   
  }


  submitSelection = e => {
    e.preventDefault();
    let kitTheme = Theme.allIncludedThemes.find(e => e.api_id === this.props.theme)
    let configPackage = {
      kit: {...this.props.kit},
      isPublic: this.state.setToPublic,
      theme: {...kitTheme}
      
    }
    //POST SELECTION TO THE USER BACKEND API!!
    api.sendSelection(configPackage, window.localStorage.token)
    .then(resp => this.handleSelection(resp))
    .catch(err => console.log(err))
  }

    //ADD RECEIVE CONFIRMEDSELECTION FROM BACKEN API, ADD TO STATE, AND REDIRECT TO COLLECTIONS PAGE.
  handleSelection = (resp) => {
    let selectionKitInfo = resp.included[0].attributes
    let selectionTheme = resp.included[0].attributes.theme

    let reifiedKitList = [...Kit.allIncludedKits]
    let i = reifiedKitList.find( kit => kit.set_num == selectionKitInfo.set_num)
    let selectionKit = ( i ? i : new Kit(selectionKitInfo))

    let selection = new Selection(resp)
    let selectionPayload = {selection: selection, kit: selectionKit, theme: selectionTheme}
    
    this.props.addSelection(selectionPayload)
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

const mapDispatchToProps = dispatch => {
  return {
    addSelection: (selectionData => {
      dispatch(addSelection(selectionData))
    })
  }
}


export default connect(null, mapDispatchToProps)(KitContainer);