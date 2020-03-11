import React, {Component} from 'react'
import KitWrapper from '../../components/Kits/kitwrapper'

class ThemeTile extends Component {

    
    render() {
        const {handleSelectTheme, theme, children, kits} = this.props
        
        let displayChildren = children.map(child => {
            return(
                <>
                <button key={child.api_id} className="theme-tile" id={child.api_id} onClick={handleSelectTheme}>
                    <h2 className="text-lg text-gray-700 pb-2 pointer-events-none">
                       {child.name}
                    </h2>
                    <h3 className="text-black font-light leading-tight text-xs pointer-events-none">BROWSE SETS</h3> 
                </button>
                <KitWrapper key={child.api_id} kits={kits[child.api_id]} child={child} />
                </>
            )
        })


        return(
            <>
            <div className="flex border-b-2 flex-col p-4 w-auto">
                <h1 className="text-xl font-bold">{theme.name}</h1>
                <div className="flex flex-wrap">
                    {displayChildren}
                    
                </div>
            </div>
            </>
        )
    }
}
export default ThemeTile;