const initialState = {
  isLoggedIn: false,
  isProfesor: false
}

const authReducer = (state = initialState, action) => {
  switch(action.type){
    case 'LOGIN_SUCCESS':
      const { isProfesor } = action
      return {
        ...state,
        isLoggedIn: true,
        isProfesor 
      }
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isLoggedIn: false,
        isProfesor: false
      }
    default:
      return state
  }
}

export default authReducer
