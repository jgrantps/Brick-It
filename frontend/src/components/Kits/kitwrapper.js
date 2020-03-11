import React, { Component } from 'react';
import { Kit } from '../../classes/kits';

class KitWrapper extends Component {

    render() {
        const {child, kits} = this.props
        var kitDisplay;
        if (kits) {     
          kitDisplay = kits.map(kit => {
             return(
            <>
             <div>
                {kit.name}
             </div>
            </>
             ) 
        })
      }else{
          kitDisplay = ""
      }
        return(
            <div className="bg-green-500">
                <h2 className="text-xl">here is a kit!!!!</h2>
        <h3>my parent is{child.name}</h3>
        {kitDisplay}

            </div>
        )
    }
}
export default KitWrapper;