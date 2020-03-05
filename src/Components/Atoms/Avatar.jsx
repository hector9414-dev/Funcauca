import React from 'react'
import * as firebase from 'firebase/app'
import { useState } from 'react'
import { connect } from 'react-redux'
import { Spinner } from 'react-bootstrap'

const Avatar = ({loggedUser}) => {


    const [avatar, setAvatar] = useState()
    const usrAvatarRef = firebase.storage().ref(`/Images/${loggedUser.uid}`)

    usrAvatarRef.getDownloadURL()
        .then(url => setAvatar(url) )


    return (
            avatar ?
            <img src={avatar} alt="avatar" className="logged-avatar"/>
            :
            <Spinner animation="grow" variant="success" />
    )
}

const mapStateToProps = state => ({
    loggedUser: state.userReducer.userLogged
})

export default connect(mapStateToProps, {} )( Avatar )