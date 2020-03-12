import React, {Component} from 'react'
import KitContainer from '../Kits/KitContainer'
import uuid from 'react-uuid'

class ThemeTile extends Component {

    
    render() {
    
        const {handleSelectTheme, theme, children, kits} = this.props
        
        let displayChildren = children.map(child => {
            return(
                <div key={uuid()}>
                <div className="flex flex-col justify-center">
                <button key={child.api_id} className="theme-tile" id={child.api_id} onClick={handleSelectTheme}>
                    <h2 className="text-lg text-gray-700 pb-2 pointer-events-none">
                       {child.name}
                    </h2>
                    <h3 className="text-black font-light leading-tight text-xs pointer-events-none">BROWSE SETS</h3> 
                </button>
                <KitContainer key={uuid()} kits={kits[child.api_id]} child={child} />
                </div>
                </div>
            )
        })


        return(
            <>
            <div className="flex border-b-2 flex-col p-4 w-auto">
                <h1 className="text-xl font-bold">{theme.name}</h1>
                <div className="flex flex-wrap items-start">
                    {displayChildren}
                    
                </div>
            </div>
            </>
        )
    }
}
export default ThemeTile;