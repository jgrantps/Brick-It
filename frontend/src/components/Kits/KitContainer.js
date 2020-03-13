import React, { Component } from 'react';
import { Kit } from '../../classes/kits';
import KitTitle from '../Kits/kitTitle'
import KitForm from './kitForm';
import uuid from 'react-uuid'
import api from '../../classes/adapters'
class KitContainer extends Component {

  state = {
    kitInfo: {}
  }

  submitSelection = e => {
    e.preventDefault();
    let kit = Kit.allIncludedKits.find(k => k.set_num === e.target.selected)
    
    
    //POST SELECTION TO THE USER BACKEND API!!
    api.sendSelection(this.state.kitInfo, window.localStorage.token)
  }

  selectPublic = (e) => {
    e.preventDefault()
    
    this.setState({...this.state, kitInfo: {...this.state.kitInfo, [e.target.selected]: e.target.value}})
  }

  //BUILD OUT KITDISPLAY TO INCLUDE SELECTION SUBMISSION FUNCTIONALITY.
  render() {
    const { kits } = this.props
    var kitDisplay;
    if (kits) {     
      kitDisplay = kits.map(kit => {
        
          return(
            <div key={uuid()}>
              <div  id={kit.set_num} className="kit-dropdown-btn px-4">
                <KitTitle key={uuid()} name={kit.name} />
                <KitForm key={uuid()}  kitId={kit.set_num} publicState={this.state.kitInfo[kit.set_num]} selectPublic={this.selectPublic} submitForm={this.submitSelection} />
              </div>
            </div>
            ) 
      })
    }else{
        kitDisplay = undefined
    }
      return(
          <>
              {kitDisplay}
          </>
      )
  }
}
export default KitContainer;