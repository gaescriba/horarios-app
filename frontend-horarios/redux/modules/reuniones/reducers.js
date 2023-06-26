const initialState = {
  reuniones: [],
  reunionCreated: false,
  reunionAccepted: false,
  reunionRejected: false
}

const reunionesReducer = (state = initialState, action) => {
  switch(action.type){
    //creator cases
    case 'ASK_SUCCESS':
      return {
        ...state,
        reunionCreated: true
      }
    case 'ASK_FAILURE':
      return {
        ...state,
        reunionCreated: false
      }

    //getter cases
    case 'GET_ALL_SUCCESS':
      const { reuniones } = action
      return {
        ...state,
        reuniones
      }
    case 'GET_ALL_FAILURE':
      return {
        ...state,
        reuniones: []
      }

    case 'SET_CREATED_FALSE':
      return {
        ...state,
        reunionCreated: false
      }

    //updater cases
    case 'ACCEPT_SUCCESS':
      return {
        ...state,
        reunionAccepted: true
      }
    case 'ACCEPT_FAILURE':
      return {
        ...state,
        reunionAccepted: false
      }

    //deleter cases
    case 'REJECT_SUCCESS':
      return {
        ...state,
        reunionRejected: true
      }
    case 'REJECT_FAILURE':
      return {
        ...state,
        reunionRejected: false
      }
    case 'SET_REJECTED_FALSE':
      return {
        ...state,
        reunionRejected: false
      }
    default:
      return state
  }
}

export default reunionesReducer
