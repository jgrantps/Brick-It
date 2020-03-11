import React, {Component} from 'react'

class ThemeTile extends Component {
    render() {
        return(
            <div>
            Hi from ThemeList, I am {this.props.name}
            </div>
        )
    }
}
export default ThemeTile;