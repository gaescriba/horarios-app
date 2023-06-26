import axios from 'axios'
import { getAddr } from '../../../helpers/getAddr'

export const getterSuccess = profesor => {
  return {
    type: 'GETTER_SUCCESS',
    profesor
  }
}

export const getterFailure = () => {
  return {
    type: 'GETTER_FAILURE'
  }
} 

export const getAllSuccess = profesores => {
  return {
    type : 'GET_ALL_SUCCESS',
    profesores
  }
}

export const getAllFailure = () => {
  return {
    type: 'GET_ALL_FAILURE'
  }
}

export const getProfesor = idProfesor => {
  return async dispatch => {
    try{
      const ipAddr = getAddr()
      const url = `http://${ipAddr}:3000/getters/profesorById?idProfesor=${idProfesor}` 
      //console.log(url)
      const response = await axios.get(url)
      //console.log(response.data)
      dispatch(getterSuccess(response.data))
    }catch(err){
      dispatch(getterFailure())
      throw err
    }
  }
}

export const getAll = () => {
  return async dispatch => {
    try {
      const ipAddr = getAddr()
      const url = `http://${ipAddr}:3000/getters/profesores`
      const response = await axios.get(url)
      //console.log(response.data['profesores'])
      dispatch(getAllSuccess(response.data['profesores']))
    }catch(err){
      dispatch(getAllFailure())
      throw err
    }
  }
}
