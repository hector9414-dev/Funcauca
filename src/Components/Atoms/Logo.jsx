import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../img/logo-no-text-.png'


const Logo = () => {
    return (
        <div>
            <Link to="/" >
                        <img src={logo} alt="img" className="main-logo"/>
            </Link>

        </div>
    )
}

export default Logo
