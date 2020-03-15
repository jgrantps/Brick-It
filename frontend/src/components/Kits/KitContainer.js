import React, { Component, Redirect } from 'react';
import {connect} from 'react-redux'
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
    setToPublic: "false"
   
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
    .then(resp => this.handleSelection(resp, this.props))
    .catch(err => console.log(err))
  }

  handleSelection = (resp, props) => {
    let selectionKitInfo = resp.included[0].attributes
    let selectionTheme = resp.included[0].attributes.theme
    
    
    
    let reifiedKitList = [...Kit.allIncludedKits]
    let i = reifiedKitList.find( kit => kit.set_num == selectionKitInfo.set_num)
    let selectionKit = ( i ? i : new Kit(selectionKitInfo))
    

    
    let selection = new Selection(resp)
    let selectionPayload = {selection: selection, kit: selectionKit, theme: selectionTheme}
    this.props.addSelection(selectionPayload)
    
    
      
  }



  selectPublic = (e) => {
    e.preventDefault()
    this.setState({ ...this.state, setToPublic: e.target.value })
  }

  //BUILD OUT KITDISPLAY TO INCLUDE SELECTION SUBMISSION FUNCTIONALITY.
  render() {
    const { kit } = this.props
      return(
          <>
             <div key={uuid()}>
              <div  id={kit.set_num} className="kit-dropdown-btn px-4">
                <KitTitle key={uuid()} name={kit.name} />
                <KitForm key={uuid()}  kitId={kit.set_num} publicState={this.state.setToPublic} selectPublic={this.selectPublic} submitForm={this.submitSelection} />
              </div>
            </div>
          </>
      )
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