import { ADD_LOGGED_USER, REMOVE_LOGGED_USER, GET_COURSES_LIST  } from "./actions"
import * as firebase from "firebase/app"
import "firebase/database";
import firebaseConfig from "../Firebase/config";

firebase.initializeApp( firebaseConfig )

const addLoggedUser = userLogged =>({
    type : ADD_LOGGED_USER,
    data: userLogged
})



const removeLoggedUser = () =>({
    type : REMOVE_LOGGED_USER
})


const getCourses = () => async dispatch => {
    
    const response = await firebase.database().ref("/Courses").once("value")
    const data = response.val()

    return dispatch({
        type : GET_COURSES_LIST,
        data
    })

}


export { addLoggedUser, removeLoggedUser, getCourses  }