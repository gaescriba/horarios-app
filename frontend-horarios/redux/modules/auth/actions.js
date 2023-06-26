import axios from "axios"
import * as SecureStore from 'expo-secure-store'
import { getAddr } from '../../../helpers/getAddr.js'

export const loginSuccess = isProfesor => {
  return {
    type: 'LOGIN_SUCCESS',
    isProfesor
  }
}

export const loginFailure = () => {
  return {
    type: 'LOGIN_FAILURE'
  }
}

export const login = (email, password, isProfesor) => {
  return async dispatch => {
    try{
      const ipAddr = getAddr()
      const data = {
        email,
        password,
        isProfesor
      }
      const url = `http://${ipAddr}:3000/getters/login`
      const response = await axios.post(url, data)
      console.log(url)
      await SecureStore.setItemAsync('token', response.data.token) 
      dispatch(loginSuccess(isProfesor))
    }catch(err){
      dispatch(loginFailure())
      throw err;
    }
  } 
}
