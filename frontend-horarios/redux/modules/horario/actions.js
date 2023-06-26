import axios from 'axios'

import { getAddr } from '../../../helpers/getAddr'

export const creatorSuccess = () => {
  return {
    type: 'CREATOR_SUCCESS'
  }
}

export const creatorFailure = () => {
  return {
    type: 'CREATOR_FAILURE'
  }
}

export const setCreatedFalse = () => {
  return {
    type: 'SET_CREATED_FALSE'
  }
}

export const getterSuccess = horario => {
  return {
    type: 'GETTER_SUCCESS',
    horario
  }
} 

export const getterFailure = () => {
  return {
    type: 'GETTER_FAILURE'
  }
}

export const updaterSuccess = () => {
  return {
    type: 'UPDATER_SUCCESS'
  }
}

export const updaterFailure = () => {
  return {
    type: 'UPDATER_FAILURE'
  }
}

export const setUpdateFalse = () => {
  return {
    type: 'SET_UPDATE_FALSE'
  }
}

export const deleterSuccess = () => {
  return {
    type: 'DELETER_SUCCESS'
  }
} 

export const deleterFailure = () => {
  return {
    type: 'DELETER_FAILURE'
  }
}

export const createHorario = horario => {
  return async dispatch => {
    try {
      const ipAddr = getAddr()
      const url = `http://${ipAddr}:3000/creators/crearHorario`
      const response = await axios.post(url, horario)
      dispatch(creatorSuccess())
    }catch(err){
      dispatch(creatorFailure())
      throw err
    }
  }
}

export const createdFalse = () => {
  return dispatch => dispatch(setCreatedFalse())
}

export const getHorario = idProfesor => {
  return async dispatch => {
    try {
      const ipAddr = getAddr() 
      const url = `http://${ipAddr}:3000/getters/horariosByProfesor?idProfesor=${idProfesor}`
      console.log(url)
      const response = await axios.get(url)
      console.log('respuesta de axios', response.data['horario'])
      dispatch(getterSuccess(response.data['horario']))
    }catch(err){
      dispatch(getterFailure())
      throw err
    }
  } 
 }  

export const updateHorario = horario => {
  return async dispatch => {
    try {
      const ipAddr = getAddr()
      const url = `http://${ipAddr}:3000/updaters/modificarHorario`
      const response = await axios.put(url, horario)
      dispatch(updaterSuccess())
    }catch(err){
      dispatch(updaterFailure())
    }
  }
}

export const updatedFalse = () => {
  return async dispatch => dispatch(setUpdateFalse())
}

export const deleteHorario = idHorario => {
  return async dispatch => {
    try {
      const ipAddr = getAddr()
      const url = `http://${ipAddr}:3000/deleters/horario?idHorario=${idHorario}`
      const response = await axios.delete(url)
      dispatch(deleterSuccess())
    }catch(err){
      dispatch(deleterFailure())
      throw err
    }
  }
} 
