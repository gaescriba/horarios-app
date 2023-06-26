import axios from 'axios'
import { getAddr } from '../../../helpers/getAddr'

export const getterSuccess = alumno => {
  return {
    type: 'GETTER_SUCCESS',
    alumno
  }
}

export const getterFailure = () => {
  return {
    type: 'GETTER_FAILURE'
  }
}

export const getAllSuccess = alumnos => {
  return {
    type: 'GET_ALL_SUCCESS',
    alumnos
  }
}

export const getAllFailure = () => {
  return {
    type: 'GET_ALL_FAILURE'
  }
}

export const getAlumno = idAlumno => {
  return async dispatch => {
    try{
      const ipAddr = getAddr()
      const url = `http://${ipAddr}:3000/getters/alumnoById?idAlumno=${idAlumno}`
      const response = await axios.get(url)
      dispatch(getterSuccess(response.data))
    }catch(err){
      dispatch(getterFailure())
      throw err
    }
  }
} 

export const getAlumnos = () => {
   return async dispatch => {
    try {
      const ipAddr = getAddr()
      url = `http://${ipAddr}:3000/getters/alumnos`
      const response = await axios.get(url)
      console.log(response.data['alumnos'])
      dispatch(getAllSuccess(response.data['alumnos']))
    }catch(err){
      dispatch(getAllFailure())
      throw err
    }
  }
}
