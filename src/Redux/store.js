import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { ADD_LOGGED_USER, REMOVE_LOGGED_USER, GET_COURSES_LIST } from './actions'
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

export default createStore(combineReducers({userReducer, coursesReducer}) , composeWithDevTools( applyMiddleware( thunk ) ))