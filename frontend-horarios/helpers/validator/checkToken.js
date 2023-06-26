import { decode } from './decoder.js'
import * as SecureStore from 'expo-secure-store'

export const checkTokenValidity = async () => {

  let result = {
    isExpired: false,
    decodedToken: {}
  }

  try{
    const retrievedToken = await SecureStore.getItemAsync('token')

    if(!retrievedToken){
      return result
    }

    const decodedToken = decode(retrievedToken)
    const isTokenExpired = Date.now() >= decodedToken.exp * 1000

    if(isTokenExpired){
      result.isExpired = true
    }else{
      result.decodedToken = decodedToken
    }
  }catch(err){
    throw err
  }
  
  return result
}

