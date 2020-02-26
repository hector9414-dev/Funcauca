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
    let data
    if(localStorage.getItem("courses")){
        data = JSON.parse(localStorage.getItem("courses"))
    }
    else{
        const response = await firebase.database().ref("/Courses").once("value")
        const courseResponse = response.val()
        localStorage.setItem("courses", JSON.stringify(courseResponse))
        data = courseResponse
    }

    return dispatch({
        type : GET_COURSES_LIST,
        data
    })

}


export { addLoggedUser, removeLoggedUser, getCourses  }