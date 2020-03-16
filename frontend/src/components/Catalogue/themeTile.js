import React, {Component} from 'react'
import KitContainer from '../Kits/KitContainer'
import { Kit } from '../../classes/kits';
import api from '../../classes/adapters'
import uuid from 'react-uuid'
import SelectThemeBtn from '../Buttons/SelectThemeBtn'

class ThemeTile extends Component {
    state = {
        kits:{},
        render:""
    }

    componentDidMount() {
        const {theme:{children}} = this.props
        
        children.map(child => {
            let preloadedKits = Kit.allIncludedKits.filter(kit => kit.theme_id === child.api_id)
           
            
            if (preloadedKits.length != 0) {
                this.setState({...this.state, kits: {...this.state.kits, [child.api_id]: [...preloadedKits]}})
            } else {
                api.fetchKitsForTheme(child.api_id)
                .then(resp=> this.loadKits(resp, child.api_id))
            }
            
            
        })
    }

    loadKits = (data, theme_id) => {
        let kitCollection = []
        console.log("data:", data, "theme_id:",  theme_id)
        

        if (data.results.length == 0){
             kitCollection.push(["no data"])
        } else {
            data.results.map(kit => {
                let newKit = new Kit(kit)
                kitCollection.push(newKit)
            })
        }
           
        this.setState({...this.state, kits: {...this.state.kits, [theme_id]: [...kitCollection]}})
        
    }

    setContainerToRender = (event) => {
        this.setState({...this.state,  render: event.target.id})
    }

    renderContainer = (child) => {

        if (this.state.kits[child] != undefined) {
            switch(this.state.render) {
                case `${child}`: return  this.state.kits[child].map(kit  => <div key = {uuid()} className="kit-dropdown"><KitContainer key={uuid()} sessionProps={this.props.sessionProps} theme={child} kit={kit} /></div>)
                default: return null
            }
        }
    }
   
    render() {
        const {theme, children} = this.props
        //DISPLAY THE CHILDREN THEMES OF THE MAIN PARENT THEME
        let displayChildren = children.map(child => {
            
            return(
                <div key={uuid()}>
                    <div className="flex flex-col justify-center">   
                        <SelectThemeBtn key={uuid()} child={child} handlOnClick={this.setContainerToRender} />
                        {this.renderContainer(child.api_id)}   
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