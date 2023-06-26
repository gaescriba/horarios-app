const initialState = {
  itemCreated: false,
  actividades: [],
  itemUpdated: false,
  itemDeleted: false,
  allDeleted: false,
}

const actividadesReducer = (state = initialState, action) => {
  switch(action.type){
    //creator cases
    case 'CREATE_SUCCESS':
      return {
        ...state,
        itemCreated: true
      }
    case 'CREATE_FAILURE':
      return {
        ...state,
        itemCreated: false
      }
    case 'SET_CREATED_FALSE':
      return {
        ...state,
        itemCreated: false
      }
    
    //getters cases
    case 'GET_ALL_SUCCESS':
      const { actividades } = action
      return {
        ...state,
        actividades
      }
    case 'GET_ALL_FAILURE':
      return {
        ...state,
        actividades: null
      }

    //updaters cases
    case 'UPDATE_SUCCESS':
      return {
        ...state,
        itemUpdated: true
      }
    case 'UPDATE_FAILURE':
      return {
        ...state,
        itemUpdated: false
      }
    case 'SET_UPDATED_FALSE':
      return {
        ...state,
        itemUpdated: false
      }

    //deleters cases
    case 'DELETE_ALL_SUCESS':
      return {
        ...state,
        allDeleted: true
      }
    case 'DELETE_ALL_FAILURE':
      return {
        ...state,
        allDeleted: false
      }
    case 'DELETE_ITEM_SUCCESS':
      return {
        ...state,
        itemDeleted: true
      }
    case 'DELETE_ITEM_FAILURE':
      return {
        ...state,
        itemDeleted: false
      }
    case 'SET_DELETED_FALSE':
      return {
        ...state,
        itemDeleted: false
      }
    default:
      return state
  }
}

export default actividadesReducer
