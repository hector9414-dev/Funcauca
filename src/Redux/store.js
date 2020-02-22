import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { ADD_LOGGED_USER, REMOVE_LOGGED_USER } from './actions'


const initialState = {
  user : false
}


const userReducer = (state = initialState, {type, currentUser}) =>{
    
    if(type === ADD_LOGGED_USER){
        return {
            ...state,
            user : true
        }
            
    }

    if(type === REMOVE_LOGGED_USER){
        return {
            ...state,
            user : false
        }
            
    }

    return state
}

export default createStore(userReducer, composeWithDevTools())