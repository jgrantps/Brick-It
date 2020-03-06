import React, { Component } from 'react'

class DashboardContainer extends Component {


    render() {
        return(
            <div>
                <h1>
                    this is the dashboard container
                    {this.props.myName}
                </h1>
            </div>
        )
    }
}

export default DashboardContainer;