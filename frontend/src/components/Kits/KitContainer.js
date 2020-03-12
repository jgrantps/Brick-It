import React, { Component } from 'react';
import { Kit } from '../../classes/kits';
import KitTitle from '../Kits/kitTitle'
import KitForm from './kitForm';
import uuid from 'react-uuid'

class KitContainer extends Component {

  state = {
  }

  submitSelection = e => {
    e.preventDefault();
    
  }

  changePublic = (e) => {
    e.preventDefault()
  }

  addState = (id) => {
    this.setState({
      ...this.state,
      id: {public: false}
    })
  }

  //BUILD OUT KITDISPLAY TO INCLUDE SELECTION SUBMISSION FUNCTIONALITY.
    render() {
        const { kits } = this.props
        var kitDisplay;
        if (kits) {     
          kitDisplay = kits.map(kit => {
            return(
              <div key={uuid()}>
              <div className="kit-dropdown-btn px-4">
                <KitTitle key={uuid()} name={kit.name} />
                <KitForm key={uuid()} kitId={kit.api_id} publicState={this.state.public} selectPublic={this.changePublic} submitForm={this.submitSelection} />
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