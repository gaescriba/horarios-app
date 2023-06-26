import React, { useCallback, useEffect, useState } from 'react'
import { View, Text, BackHandler, StyleSheet, Button } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { checkTokenValidity } from '../../helpers/validator/checkToken.js' 
import { accept } from '../../redux/modules/reuniones/actions.js'

export default AceptarReunion = () => {

  const dispatch = useDispatch()
  
  const route = useRoute()

  const id_reunion = route.params?.id_reunion

  const reunionAccepted = useSelector(state => state.reuniones?.reunionAccepted)
  
  const navigation = useNavigation()

  const [error, setError] = useState(false)
  const [retrievedToken, setRetrievedToken] = useState(null)

  useEffect(() => {
    const verifyToken = async () => {
      try{
        const verifiedtoken = await checkTokenValidity()
        if(verifiedtoken.decodedToken){
          //console.log('token bueno')
          //console.log(verifiedtoken.decodedToken)
          setRetrievedToken(verifiedtoken.decodedToken)
        }else{
          //console.log('token malo')
          navigation.navigate('Home')
        }
      }catch(err){
        console.log(`Error en token :${err}`)
      }
    }
    verifyToken()
  },[])

  let handlePress = option => {
    if(!option){
      navigation.navigate('VerHorario')
    }else{
      console.log('antes del dispatch', id_reunion)
      dispatch(accept(id_reunion))
        .catch(err => {
          console.log(err)
          if(!error){
            setError(true)
          }
        })
    }
  }

  useEffect(() => {
    if(reunionAccepted){
      navigation.navigate('VerHorario')
    }
  },[reunionAccepted])

  const handleBackPress = useCallback(() => {
    return true
  },[])

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress)
    
    return () => {
      backHandler.remove()
    }
  }, [handleBackPress])

  return (
    <View style = { styles.container }>
      <Text style = { styles.text }> Desea aceptar la reunion?</Text>
      <Text style = { styles.text }> Este cambio es irreversible</Text>
      <View style = { styles.buttonContainer }>
        <Button 
          title = 'Aceptar reunion' 
          onPress = { () => handlePress(true) }
        />  
        <View styles = { styles.space }/>
        <Button 
          style = { styles.button }
          title = 'Volver' 
          onPress = { () => handlePress(false) }
        />
      </View>
      <Text> { error ? 'Hubo un error al eliminar la actividad' : '' } </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    marginBottom: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  space: {
    width: 20,
  },
})
