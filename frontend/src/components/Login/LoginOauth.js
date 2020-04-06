import React from 'react'
import SVG from '../../assets/images/githubSVG'


export const LoginOauth = props => {
    return (
    <>
    <a className="submit-btn flex text-center justify-around  mr-2 my-2" href="http://localhost:5000/auth/github">
    <SVG width="24" height="24" />Login Via GITHUB</a>
    </>
    )
}

export default LoginOauth;