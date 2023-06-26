import axios from 'axios'
import { getAddr } from '../../../helpers/getAddr'

//creator types
export const askSuccess = () => {
  return {
    type : 'ASK_SUCCESS'
  }
}

export const askFailure = () => {
  return {
    type: 'ASK_FAILURE'
  }
}

//getter types
export const getAllSucess = reuniones => {
  return {
    type: 'GET_ALL_SUCCESS',
    reuniones
  }
}

export const getAllFailure = () => {
  return {
    type: 'GET_ALL_FAILURE'
  }
}

export const setCreatedFalse = () => {
  return {
    type: 'SET_CREATED_FALSE'
  }
}

//updater types
export const acceptSuccess = () => {
  return {
    type: 'ACCEPT_SUCCESS'
  }
}

export const acceptFailure = () => {
  return {
    type: 'ACCEPT_FAILURE'
  }
}

//deleter types
export const rejectSuccess = () => {
  return {
    type: 'REJECT_SUCCESS'
  }
}

export const rejectFailure = () => {
  return {
    type: 'REJECT_FAILURE'
  }
}

export const setRejectedFalse = () => {
  return {
    type: 'SET_REJECTED_FALSE'
  }
}

export const solicitar = reunion => {
  return async dispatch => {
    try {
      const ipAddr = getAddr()
      const url = `http:${ipAddr}:3000/creators/solicitarReunion`
      const response = await axios.post(url, reunion)
      dispatch(askSuccess())
    }catch(err){
      dispatch(askFailure())
      throw err
    }
  }
}

export const getAll =  idHorario => {
  return async dispatch => {
    try {
      const ipAddr = getAddr()
      const url = `http://${ipAddr}:3000/getters/reunionesByHorario?idHorario=${idHorario}`
      const response = await axios.get(url)
      //console.log(response.data['reuniones'])
      dispatch(getAllSucess(response.data['reuniones']))
    }catch(err){
      dispatch(getAllFailure())
      throw err
    }
  }
} 

export const createdFalse = () => {
  return dispatch => {
    console.log('setFalse disparado')
    dispatch(setCreatedFalse())
  } 
}

export const accept = idReunion => {
  return async dispatch => {
    try {
      const ipAddr = getAddr()
      const url = `http://${ipAddr}:3000/updaters/aceptarReunion`
      const response = axios.put(url, {idReunion})
      dispatch(acceptSuccess())
    }catch(err){
      dispatch(acceptFailure())
      throw err
    }
  }
}

export const reject = idReunion => {
  return async dispatch => {
    try {
      const ipAddr = getAddr()
      const url = `http://${ipAddr}:3000/deleters/deleteReunion?idReunion=${idReunion}`
      const response = axios.delete(url)
      dispatch(rejectSuccess())
    }catch(err){
      dispatch(rejectFailure())
      throw err
    }
  }
}

export const rejectedFalse = () => {
  return dispatch => dispatch(setRejectedFalse())
} 
