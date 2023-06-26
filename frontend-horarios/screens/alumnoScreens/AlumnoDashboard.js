import React, { useCallback, useEffect, useState } from 'react'
import { View, Text, BackHandler, StyleSheet, Button, TouchableOpacity, SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { checkTokenValidity } from '../../helpers/validator/checkToken.js' 
import { getAlumno } from '../../redux/modules/alumno/actions.js'

export default AlumnoDashboard = () => {

  const dispatch = useDispatch()

  const alumno = useSelector(state => state.alumno?.alumno)
  
  const navigation = useNavigation()
  
  const [nombreAlumno, setNombreAlumno] = useState('')
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

  useEffect(() => {
    if(retrievedToken){
      //console.log('id profesor', retrievedToken.idAlumno)
      dispatch(getAlumno(retrievedToken.idAlumno))
        .catch(err => console.log('error en dispatch de alumno: ', err))
    }
  },[retrievedToken])

  useEffect(() => {
    if(alumno && alumno.nombre_alumno){
      //console.log('profesor: ', profesor)
      setNombreAlumno(alumno.nombre_alumno)
    }
  },[alumno])


  let handlePress = option => {
    if(!option){
      navigation.navigate('Home')
    }else{
      navigation.navigate('BuscarProfesor')
    }
  }

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
    <SafeAreaView style = { styles.container }>
      <View style = { styles.header }>
        <View style = {styles.square} />
      </View>
      <View style = { styles.content }>
        <Text style = { styles.text }> BIENVENIDO {nombreAlumno.toUpperCase()}</Text>
          <TouchableOpacity
            style = { styles.button }
            onPress = { () => handlePress(true) }
          >
            <Text style = { styles.buttonText } > BUSCAR PROFESOR </Text>
          </TouchableOpacity> 
          <TouchableOpacity
            style = { styles.button }
            onPress = { () => handlePress(true) }
          >
            <Text style = { styles.buttonText } > CERRAR SESION </Text>
          </TouchableOpacity> 
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#323232',
    paddingTop: 29
  },
  header: {
    height: 134.333,
    backgroundColor: '#ED6A5A',
    width: '100%',
  },
  square: {
    width: 72,
    height: 72,
    backgroundColor: '#ED6A5A',
    position: 'absolute',
    top: 67.167,
    left: '50%',
    marginLeft: -36,
    transform: [{ rotate: '45deg' }],
  },
   content: {
    flex: 1,
    paddingTop: 17.667,
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    color: '#EAF4D3',
    fontWeight: 'bold',
    marginBottom: 17.667,
  },
  button: {
    backgroundColor: '#EAF4D3',
    justifyContent: 'center',
    marginHorizontal: 37,
    marginBottom: 17.667,
    alignItems: 'center',
    width: 286,
    height: 48,
  },
  buttonText: {
    color: '#323232',
    fontSize: 16,
    fontWeight: 'bold',
  },
})
