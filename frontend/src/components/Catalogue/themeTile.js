import React, {Component} from 'react'
import KitContainer from '../Kits/KitContainer'
import { Kit } from '../../classes/kits';
import api from '../../classes/adapters'
import uuid from 'react-uuid'
import SelectThemeBtn from '../Buttons/SelectThemeBtn'
import {connect} from 'react-redux'
import {addKits} from '../../actions/adjusterSelections'

class ThemeTile extends Component {
    state = {
        render:""
    }

    componentDidMount() {
        const {theme:{children}, kits} = this.props
        this.props.addKits(children, kits)
    }
    

    loadingSignal = () => {
        if (this.props.loading){
            return <h1 className="text-2xl">I AM LOADING!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!</h1>
        }
    }

    setContainerToRender = (event) => {
        this.setState({...this.state,  render: event.target.id})
    }

    renderContainer = (child) => {
        const {kits} = this.props
    
            switch(this.state.render) {
                case `${child}`: return kits.find(theme => Object.keys(theme)[0] == child)[child].map(kit  => <div key = {uuid()} className="kit-dropdown"><KitContainer key={uuid()} sessionProps={this.props.sessionProps} theme={child} kit={kit} /></div>)
                default: return null
            }
        
    }
   
    render() {
        const {theme, children} = this.props
        //DISPLAY THE CHILDREN THEMES OF THE MAIN PARENT THEME
        let displayChildren = children.map(child => {
            
            return(
                <div key={uuid()}>
                    {this.loadingSignal()}
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

const mapDispatchToProps = dispatch => {
    return {
        addKits: ((children, kits) => {
            dispatch(addKits(children, kits))
        })
    }
}

const mapStateToProps = (state) => {
    return { kits: state.kits, loading: state.loading }
  }

export default connect(mapStateToProps, mapDispatchToProps)(ThemeTile);