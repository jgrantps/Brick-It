import React, { Component } from 'react'
import {SubmitBtn} from '../components/Elements/Elements'


class Counter extends Component{
state = {
    counter: 0
}

upVote = () => {
    console.log("success")
    // let currentState = this.state.counter
    let newState = this.state.counter + 1
    this.setState({
        counter: newState
    })
}

render(){
    return(
        <>
        <SubmitBtn btnAction={this.upVote} />
        <h2>my vote is: 
    <span>{this.state.counter}</span>
        </h2>
        </>
    )
}
}



export default Counter;