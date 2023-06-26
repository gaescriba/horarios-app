import axios from 'axios'
import { getAddr } from '../../../helpers/getAddr'


//creator types
export const createSucess = () => {
  return {
    type: 'CREATE_SUCCESS'
  }
}

export const createFailure = () => {
  return {
    type: 'CREATE_FAILURE'
  }
}

export const setCreatedFalse = () => {
  return {
    type: 'SET_CREATED_FALSE'
  }
}

//getters types
export const getAllSuccess = actividades => {
  return {
    type: 'GET_ALL_SUCCESS',
    actividades
  }
}

export const getAllFailure = () => {
  return {
    type: 'GET_ALL_FAILURE'
  }
}

//updaters types
export const updateSuccess = () => {
  return {
    type: 'UPDATE_SUCCESS'
  }
}

export const updateFailure = () => {
  return {
    type: 'UPDATE_FAILURE'
  }
}

export const setUpdatedFalse = () => {
  return {
    type: 'SET_UPDATED_FALSE'
  }
}

//deleters types
export const deleteItemSuccess = () => {
  return {
    type: 'DELETE_ITEM_SUCCESS'
  }
} 

export const deleteItemFailure = () => {
  return {
    type: 'DELETE_ITEM_FAILURE'
  }
}

export const setDeletedFalse = () => {
  return {
    type: 'SET_DELETED_FALSE'
  }
}

export const deleteAllSuccess = () => {
  return {
    type: 'DELETE_ALL_SUCCESS'
  }
}

export const deleteAllFailure = () => {
  return {
    type: 'DELETE_ALL_FAILURE'
  }
}

export const create = horario => {
  return async dispatch => {
    try{
      const ipAddr = getAddr()
      const url = `http://${ipAddr}:3000/creators/crearActividad`
      console.log(url)
      console.log(horario)
      const response = await axios.post(url, horario)
      dispatch(createSucess())
    }catch(err){
      dispatch(createFailure())
      throw err
    }
  }
}

export const createdFalse = () => {
  return dispatch => dispatch(setCreatedFalse())
}

export const getAll = idHorario => {
  return async dispatch => {
    try{
      const ipAddr = getAddr()
      const url = `http://${ipAddr}:3000/getters/actividadesByHorario?idHorario=${idHorario}`
      //console.log(url)
      const response =  await axios.get(url)
      if(response.data === undefined){
        //console.log('undefined en la data')
        dispatch(getAllSuccess([]))
      }else{
        //console.log(response.data)
        dispatch(getAllSuccess(response.data['actividades']))
      }
    }catch(err){
      dispatch(getAllFailure())
      throw err
    }
  }
}

export const update = horario => {
  return async dispatch => {
    try {
      const ipAddr = getAddr()
      const url = `http://${ipAddr}:3000/updaters/modificarActividad`
      const response = await axios.put(url, horario)
      dispatch(updateSuccess())
    }catch(err){
      dispatch(updateFailure())
      throw err
    }
  }
}

export const updatedFalse = () => {
  return dispatch => dispatch(setUpdatedFalse())
}

export const deleteAll = idHorario => {
  return async dispatch => {
    try {
      const ipAddr = getAddr()
      const url = `http://${ipAddr}:3000/deleters/deleteActividades?idHorario=${idHorario}`
      const response = await axios.delete(url)
      dispatch(deleteAllSuccess())
    }catch(err){
      dispatch(deleteAllFailure())
      throw err
    }
  }
}

export const deleteItem = idActividad => {
  return async dispatch => {
    try {
      const ipAddr = getAddr()
      const url = `http://${ipAddr}:3000/deleters/deleteActividad?idActividad=${idActividad}`
      const response = await axios.delete(url)
      dispatch(deleteItemSuccess())
    }catch(err){
      dispatch(deleteItemFailure())
      throw err
    }
  }
}

export const deletedFalse = () => {
  return dispatch => dispatch(setDeletedFalse())
}
