const initialState = {
  profesor: null,
  profesores: []
}

const profesoresReducer = (state = initialState, action) => {
  switch(action.type){
    case 'GETTER_SUCCESS':
      const { profesor } = action
      return {
        ...state,
        profesor
      }
    case 'GETTER_FAILURE':
      return{
        ...state,
        profesor: null
      } 
    case 'GET_ALL_SUCCESS':
      const { profesores } = action
      return {
        ...state,
        profesores
      }
    case 'GET_ALL_FAILURE':
      return {
        ...state,
        profesores: []
      }
    default:
      return state
  }
}

export default profesoresReducer 
