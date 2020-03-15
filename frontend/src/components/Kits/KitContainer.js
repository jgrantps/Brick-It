import React, { Component } from 'react';
import { Kit } from '../../classes/kits';
import { Theme } from '../../classes/themes'
import KitTitle from '../Kits/kitTitle'
import KitForm from './kitForm';
import uuid from 'react-uuid'
import api from '../../classes/adapters'
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
    .then(resp => console.log(resp))
    .catch(err => console.log(err))
  }

  selectPublic = (e) => {
    e.preventDefault()
    this.setState({ ...this.state, setToPublic: e.target.value })
  }

  //BUILD OUT KITDISPLAY TO INCLUDE SELECTION SUBMISSION FUNCTIONALITY.
  render() {
    // debugger
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
export default KitContainer;