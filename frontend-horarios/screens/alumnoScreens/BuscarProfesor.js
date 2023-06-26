import React, { useCallback, useEffect, useState } from 'react'
import { View, Text, BackHandler, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/AntDesign.js'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { checkTokenValidity } from '../../helpers/validator/checkToken.js'
import { getAll, getProfesor } from '../../redux/modules/profesor/actions.js'
import { getHorario } from '../../redux/modules/horario/actions.js'

export default BuscarProfesor = () => {

  const dispatch = useDispatch()
  
  const navigation = useNavigation()

  const profesoresState = useSelector(state => state.profesor?.profesores)

  const profesor = useSelector(state => state.profesor?.profesor)
 
  const [profesorSeleccionado, setProfesorSeleccionado] = useState({})
  const [retrievedToken, setRetrievedToken] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [hayHorario, setHayHorario] = useState(true)

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
      dispatch(getAll())
        .catch(err => console.log('error en dispatch de profesores: ', err))
    }
  },[retrievedToken])

  useEffect(() => {
    if(profesoresState){
      let nombresTemp = []
      //console.log('profesores recibidos', profesoresState)
      profesoresState.map(profesor => nombresTemp.push(profesor.nombre_profesor))
      setProfesorSeleccionado(profesoresState[0])
    }
  },[profesoresState])


  let handlePress = () => {
    //console.log(profesorSeleccionado)
    dispatch(getProfesor(profesorSeleccionado.id_profesor))
      .catch(err => console.log('error en getProfesor', err))
  }

  useEffect(() => {
    if(profesor){
      //console.log('profesor seteado', profesor)
      const { id_profesor } = profesor
      dispatch(getHorario(id_profesor))
        .then(() => {
          setHayHorario(true)
          navigation.navigate('VerHorario')
        })
        .catch(() => setHayHorario(false))
    }
  },[profesor])
  
  const handlePickerPress = profesor => {

    setShowModal(false)
    setProfesorSeleccionado(profesor)
    console.log(profesor)
  }
  
  const handleBackPress = useCallback(() => {
    return true
  }, [])

  useEffect(() => {
    const backhandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress)

    return () => {
      backhandler.remove()
    }
  }, [handleBackPress])
  
  useEffect(() => {
    const unsuscribe = navigation.addListener('focus', () => {
      dispatch(getAll())
        .catch(() => console.log('error'))
        .finally(() => {
        })
    })
    return unsuscribe
  },[navigator, dispatch, profesoresState])

  return (
    <SafeAreaView  style = { styles.container }>
      <View style = { styles.header }>
        <View style = {styles.square } />
      </View>
      <View style = { styles.content }>
        <Text style = { styles.label }> SELECCIONE EL PROFESOR</Text>
        <TouchableOpacity
          onPress = {() => setShowModal(true)}
          style = { styles.pickerContainer }
        >
          <View style = { styles.optionContainer }>
            <Text style = { styles.optionText }> { profesorSeleccionado && profesorSeleccionado?.nombre_profesor?.toUpperCase() } </Text>
            <Icon name = "caretdown" color = '#EAF4D3'/>
          </View>
          {showModal && (
            <Modal
              visible = { showModal }
              onRequestClose = {() => setShowModal(false)}
              hasBackdrop = { true }
            >
              <View style = { styles.modal }>
                {profesoresState.map((profesor, index) => (
                  <TouchableOpacity
                    key = { index }
                    onPress = {() => handlePickerPress(profesor)}
                    style = { styles.pickerItem }
                  >
                    <Text style = { styles.pickerItemText }> { profesor.nombre_profesor.toUpperCase() } </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Modal>
          )}
        </TouchableOpacity>
        <TouchableOpacity
            style = { styles.button }
            onPress = { handlePress }
          >
            <Text style = { styles.buttonText } > BUSCAR PROFESOR </Text>
        </TouchableOpacity> 
        { !hayHorario && <Text style = { styles.label }> EL PROFESOR NO HA CREADO SU HORARIO </Text> }
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
    alignItems: 'center'
  },
  label: {
    color: '#EAF4D3',
    fontWeight: 'bold',
  },
  pickerContainer: {
    height: 134.333,
    alignItems: 'center',
    justifyContent: 'center'
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  optionText: {
    color: '#EAF4D3',
    fontWeight: 'bold',
    marginRight: 50,
  },
  modal: {
    backgroundColor: '#323232',
    color: '#EAF4D3',
    borderColor: '#EAF4D3',
    borderWidth: 5,
    width: 350,
    height: 400,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  pickerItem: {
    //width: 100,
    height: 30,
    margin: 10,
  },
  pickerItemText: {
    color: '#EAF4D3',
    fontWeight: 'bold'
  },
  picker:{
    marginTop: 17.667,
    width: 286,
    justifyContent: 'center',
    color: '#EAF4D3',
  },
  item: {
    backgroundColor: '#323232',
    color: '#EAF4D3',
  },
  button: {
    backgroundColor: '#EAF4D3',
    justifyContent: 'center',
    marginHorizontal: 37,
    marginBottom: 17.667,
    marginTop: 17.667,
    alignItems: 'center',
    width: 286,
    height: 48,
  },
  buttonText: {
    color: '#323232',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
