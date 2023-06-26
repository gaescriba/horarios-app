import React, { useCallback, useEffect, useState } from 'react'
import { View, Text, BackHandler, StyleSheet, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { deleteHorario } from '../../redux/modules/horario/actions.js'
import { deleteAll } from '../../redux/modules/actividades/actions.js'
import { checkTokenValidity } from '../../helpers/validator/checkToken.js' 
import { createdFalse } from '../../redux/modules/horario/actions.js'

export default EliminarJornada = () => {
  
  const dispatch = useDispatch()

  const horario = useSelector(state => state.horarios?.horario)
  
  const navigation = useNavigation()

  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [retrievedToken, setRetrievedToken] = useState(null)
  const [idHorario, setIdHoraio] = useState(0)
  
  useEffect(() => {
    const verifyToken = async () => {
      try{
        const verifiedtoken = await checkTokenValidity()
        if(verifiedtoken.decodedToken){
          console.log('token bueno')
          //console.log(verifiedtoken.decodedToken)
          setRetrievedToken(verifiedtoken.decodedToken)
        }else{
          console.log('token malo')
          navigation.navigate('Home')
        }
      }catch(err){
        console.log(`Error en token :${err}`)
      }
    }
    verifyToken()
  },[])

  useEffect(() => {
    if(horario){
      setIdHoraio(horario.id_horario)
    }
  },[horario])
  
  let handlePress = option => {
    //console.log('en deleteHorario')
    //console.log(dataHorario)
    if(!option){
      navigation.navigate('VerHorario')
    }else{
      console.log('antes del dispatch')
      const deleteHorarioDispatch = dispatch(deleteHorario(idHorario))
      const deleteAllDispatch = dispatch(deleteAll(idHorario))
      Promise.all([deleteHorarioDispatch, deleteAllDispatch])
        .then(() =>{
          setSuccess(true)
          dispatch(createdFalse())
        })
        .catch(err => setSuccess(true))
    }
  }
  
  useEffect(() =>{
    if(success) navigation.navigate('Home')
  },[success, dispatch, navigation])

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
      <Text style = { styles.text }> Desea eliminar la Jornada?</Text>
      <Text style = { styles.text }> Este cambio es irreversible</Text>
      <View style = { styles.buttonContainer }>
        <Button 
          title = 'Eliminar Actividad' 
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
