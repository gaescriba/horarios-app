const initialState = {
  alumno: null,
  alumnos: []
}

const alumnoReducer = (state = initialState, action) => {
  switch(action.type){
    case 'GETTER_SUCCESS':
      const { alumno } = action
      return {
        ...state,
        alumno 
      }
    case 'GETTER_FAILURE':
      return {
        ...state,
        alumno: null
      } 
    case 'GET_ALL_SUCCESS':
      const { alumnos } = action
      return {
        ...state,
        alumnos
      }
    case 'GET_ALL_FAILURE':
      return {
        ...state,
        alumnos: []
      }
    default:
      return state
  }
}

export default alumnoReducer
