import React, { Component } from 'react'
import {connect} from 'react-redux'




class DashboardContainer extends Component {


    render() {
const {name} = this.props
        return(
            <>
           
            <div className="pt-12">
                <h1>
                    {name}'s Dashboard!!!
                </h1>
            </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        name: state.user.name
    }
}

export default connect(mapStateToProps)(DashboardContainer);