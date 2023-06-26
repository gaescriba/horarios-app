import React, { useCallback, useEffect, useRef, useState } from 'react'
import { View, Text, BackHandler, StyleSheet, Button, TouchableOpacity } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { checkTokenValidity } from '../../helpers/validator/checkToken.js' 
import { deleteItem } from '../../redux/modules/actividades/actions.js'
import { deletedFalse } from '../../redux/modules/actividades/actions.js'

export default EliminarActividad = () => {

  const dispatch = useDispatch()
  
  const isItemDeleted = useSelector(state => state.actividades?.itemDeleted)
  
  const isItemDeletedRef = useRef(false) 
  
  const route = useRoute()

  const id_actividad = route.params?.id_actividad

  const navigation = useNavigation()

  const [error, setError] = useState(false)
  const [retrievedToken, setRetrievedToken] = useState(null)
  
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
    if(isItemDeleted){
      dispatch(deletedFalse())
      isItemDeletedRef.current = true
    }
  },[isItemDeleted])

  useEffect(() => {
    if(isItemDeletedRef.current){
      navigation.navigate('VerHorario')
    }
  },[isItemDeletedRef.current])
  
  let handlePress = option => {
    if(!option){
      navigation.navigate('VerHorario')
    }else{
      //console.log(id_actividad)
      dispatch(deleteItem(id_actividad))
        .catch(() => setError(true))
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
    <View style = { styles.container }  >
      <View style = { styles.header }>
        <View style = { styles.square } />
      </View>
      <View style = { styles.content } >
        <Text style = { styles.text }> Desea eliminar la actividad?</Text>
        <Text style = { styles.text }> ESTE CAMBIO ES IRREVERSIBLE </Text>
          <TouchableOpacity
            style = { styles.button }
            onPress = { () => handlePress(true) }
          >
            <Text style = { styles.buttonText } > ELIMINAR </Text>
          </TouchableOpacity> 
          <TouchableOpacity
            style = { styles.button }
            onPress = { () => handlePress(false) }
          >
            <Text style = { styles.buttonText } > VOLVER </Text>
          </TouchableOpacity> 
        <Text style = { styles.text }> { error ? 'Hubo un error al eliminar la actividad' : '' } </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#323232',
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
    alignItems: 'center',
   },
  text: {
    textAlign: 'center',
    marginBottom: 40,
    color: '#EAF4D3',
    fontWeight: 'bold'
  },
  buttonContainer: {
    flexDirection: 'row',
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
