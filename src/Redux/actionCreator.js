import { ADD_LOGGED_USER, REMOVE_LOGGED_USER  } from "./actions"


const addLoggedUser = () =>({
    type : ADD_LOGGED_USER
})

const removeLoggedUser = () =>({
    type : REMOVE_LOGGED_USER
})


export { addLoggedUser, removeLoggedUser  }