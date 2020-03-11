import React, { Component } from 'react';
import { Kit } from '../../classes/kits';

class KitWrapper extends Component {

  //BUILD OUT KITDISPLAY TO INCLUDE SELECTION SUBMISSION FUNCTIONALITY.
    render() {
        const {child, kits} = this.props
        var kitDisplay;
        if (kits) {     
          kitDisplay = kits.map(kit => {
            return(
              <>
              <div className="mx-2 bg-gray-200">
               <h2 className="leading-tight text-sm font-bold px-2 py-2">{kit.name}</h2> 
             </div>
            </>
             ) 
        })
      }else{
          kitDisplay = ""
      }
        return(
            <>
            <div className="display-wrapper">
                {kitDisplay}
            </div>
            </>
        )
    }
}
export default KitWrapper;