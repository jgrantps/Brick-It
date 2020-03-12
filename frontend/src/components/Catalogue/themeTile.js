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
        
        children.map(theme => 
            api.fetchKitsForTheme(theme.api_id)
            .then(resp=> this.loadKits(resp, theme.api_id))
        )
    }

    loadKits = (data, theme_id) => {
        let kitCollection = []
         if (data.results){
             data.results.map(kit => {
                let newKit = new Kit(kit)
                 kitCollection.push(newKit)
             })
             this.setState({...this.state, kits: {...this.state.kits, [theme_id]: [...kitCollection]}})
        }
    }

    setContainerToRender = (event) => {
        this.setState({...this.state,  render: event.target.id})
    }

    renderContainer = (child) => {
        switch(this.state.render) {
            case `${child}`: return <KitContainer key={uuid()} kits={this.state.kits[child]} />
            default: return null
        }
    }
   
    render() {
        const {theme, children} = this.props
        
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