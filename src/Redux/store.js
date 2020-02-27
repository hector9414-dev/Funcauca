import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { ADD_LOGGED_USER, REMOVE_LOGGED_USER, GET_COURSES_LIST, ADD_COURSE_TO_CART, REMOVE_COURSE_FROM_CART, FLUSH_CART } from './actions'
import thunk from 'redux-thunk'


const userState = {
  userLogged : null
}


const userReducer = (state = userState, {type, data}) =>{

    if(type === ADD_LOGGED_USER){
        return {
            ...state,
            userLogged : data
        }
    }
    if(type === REMOVE_LOGGED_USER){
        return {
            ...state,
            userLogged : null
        }
    }
    

    return state
}

const coursesState = {
    coursesList : []
  }
  
  
  const coursesReducer = (state = coursesState, {type, data}) =>{

      if(type === GET_COURSES_LIST ){

        if(state.coursesList){
            state.coursesList = []
        }

          return {
              ...state,
              coursesList: state.coursesList.concat(data)
          }
      }
      return state
  }

  const cartState = {
    cart : []
  }
  
  
  const cartReducer = (state = cartState, {type, courseId}) =>{

      if(type === ADD_COURSE_TO_CART ){
        return {
              ...state,
              cart: state.cart.concat(courseId)
          }
      }

      if(type === REMOVE_COURSE_FROM_CART ){
          return {
              ...state,
              cart: state.cart.filter( course => course!==courseId)
          }
      }

      if(type === FLUSH_CART){
          return{
              ...state,
              cart : []
          }
      }
      
      return state
  }

export default createStore(combineReducers({userReducer, coursesReducer, cartReducer}) , composeWithDevTools( applyMiddleware( thunk ) ))



