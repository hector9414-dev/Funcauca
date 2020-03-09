import { ADD_LOGGED_USER, REMOVE_LOGGED_USER, GET_COURSES_LIST, ADD_COURSE_TO_CART, REMOVE_COURSE_FROM_CART, FLUSH_CART  } from "./actions"
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

const getLocalCart = ()=> dispatch=>{
    if(localStorage.getItem("cart")){
        const courseId = JSON.parse(localStorage.getItem("cart"))
        return dispatch({
            type: ADD_COURSE_TO_CART,
            courseId
        })
    }
    
}


const addCourseToCart = courseId => dispatch =>{
    if(localStorage.getItem("cart")){
        const tempCart = JSON.parse(localStorage.getItem("cart"))
        const localCart = [...tempCart, courseId]
        localStorage.setItem("cart",JSON.stringify(localCart))
    }

    else{
        localStorage.setItem("cart", JSON.stringify(courseId))
    }
     
    return dispatch({
        type: ADD_COURSE_TO_CART,
        courseId

    })
    
}

const removeCourseFromCart = courseId => dispatch =>{

    const tempCart = [JSON.parse(localStorage.getItem("cart"))]
    const newCart = tempCart.filter(course => course !==courseId)
    localStorage.setItem("cart", JSON.stringify(newCart))
    return dispatch({
        type: REMOVE_COURSE_FROM_CART,
        courseId
    })
    
}

const flushCart = () => dispatch =>{

    localStorage.removeItem("cart")

    return dispatch({
        type: FLUSH_CART
    })
}


export { addLoggedUser, removeLoggedUser, getCourses, addCourseToCart, removeCourseFromCart, getLocalCart, flushCart  }