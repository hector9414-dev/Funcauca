import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const Private = ({component: Component,loggedUser, ...rest}) => {

    if(!loggedUser){
        return <Redirect to="/" />
    }

    return (
        <Route {...rest} component={Component} />
    )
}


const mapStateToProps = state => ({
    loggedUser: state.userReducer.userLogged
})




export default connect(mapStateToProps, {} )( Private )
