const initialState = {
  horario: null,
  created: false,
  updated: false,
  deleted: false,
}

const horariosReducer = (state = initialState, action) =>{
  switch(action.type){
    case 'CREATOR_SUCCESS':
      return {
        ...state,
        created: true
      }
    case 'CREATOR_FAILURE':
      return {
        ...state,
        created: false
      }
    case 'SET_CREATED_FALSE':
      return {
        ...state,
        horario: null
      }
    case 'UPDATER_SUCCESS':
      return {
        ...state,
        updated: true
      }
    case 'UPDATER_FAILURE':
      return {
        ...state,
        updated: false
      }
    case 'SET_UPDATE_FALSE':
      return {
        ...state,
        updated: false
      }
    case 'GETTER_SUCCESS':
      const { horario } = action
      return {
        ...state,
        horario
      }
    case 'GETTER_FAILURE':
      return {
        ...state,
        horario: null
      }
    case 'DELETER_SUCCESS':
      return {
        ...state,
        deleted: true
      }
    case 'DELETER_FAILURE':
      return {
        ...state,
        deleted: false
      }
    default:
      return state
  }
}

export default horariosReducer
