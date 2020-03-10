import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const Private = ({component: Component, ...rest}) => {

    if(!localStorage.getItem("user")){
        return <Redirect to="/" />
    }

    return (
        <Route {...rest} component={Component} />
    )
}



export default ( Private )
