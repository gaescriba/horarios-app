import React, { useCallback, useEffect, useRef, useState } from 'react'
import { View, Text, BackHandler, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, Modal } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign.js'
import { useNavigation } from '@react-navigation/native'
import { checkTokenValidity } from '../../helpers/validator/checkToken.js'
import { useDispatch, useSelector } from 'react-redux'
import { create } from '../../redux/modules/actividades/actions.js'
import { createdFalse } from '../../redux/modules/actividades/actions.js'

export default AgregarActividad = () => {

  const dispatch = useDispatch()

  const horario = useSelector(state => state.horarios?.horario)

  const profesor = useSelector(state => state.profesor?.profesor)

  const itemCreated = useSelector(state => state.actividades?.itemCreated)

  const itemCreatedRef = useRef(false)
  
  const navigation = useNavigation()

  const [horaEntrada, setHoraEntrada] = useState('')
  const [horaSalida, setHoraSalida] = useState('')
  const [idProfesor, setIdProfesor] = useState(0)
  const [idHorario, setIdHorario] = useState(0)
  const [wrongFields, setWrongFields] = useState(false)
  const [hayHorario, setHayHorario] = useState(false)
  const [showModalEntrada, setShowModalEntrada] = useState(false)
  const [showModalSalida, setShowModalSalida] = useState(false)
  const [retrievedToken, setRetrievedToken] = useState(null)
  const [descripcionActividad, setDescripcionActividad] = useState('')
  const [horas, setHoras] = useState([])
  
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
    if(retrievedToken){
      setIdProfesor(retrievedToken.idProfesor)
    }
  },[retrievedToken])

  useEffect(() => {
    if(horario){
      setIdHorario(horario.id_horario)
      setHoraEntrada(horario.hora_entrada.split(':')[0] + ':00')
      setHoraSalida(horario.hora_salida.split(':')[0] + ':00')
    }
  }, [horario])

  useEffect(() => {
    if(profesor){
      console.log('profesor obtenido', profesor)
    }
  },[profesor])

  useEffect(() => {
    if(horaEntrada != '' && horaSalida != ''){
      let horasTemp = []
      const horaEntradaInt = parseInt(horaEntrada.split(':')[0])
      const horaSalidaInt = parseInt(horaSalida.split(':')[0])
      for(let i = horaEntradaInt; i <= horaSalidaInt; i++){
        horasTemp.push(i + ':00')
      }
      console.log(horasTemp)
      setHoras(horasTemp) 
    }
  },[horaEntrada, horaSalida])

  useEffect(() => {
    if(itemCreated){
      dispatch(createdFalse())
      itemCreatedRef.current = true
    }
  },[itemCreated])

  useEffect(() => {
    if(itemCreatedRef.current){
      navigation.navigate('VerHorario')
    }
  },[itemCreatedRef.current])

  let handlePickerPressEntrada = hora => { 
    console.log('horaEntrada')
    setShowModalEntrada(false)
    setHoraEntrada(hora)
  }
  
  let handlePickerPressSalida =  hora => {
    console.log('horaSalida')
    setShowModalSalida(false)
    setHoraSalida(hora)
  }

  let handleAgregarActividad = () => {

    /*console.log(horaEntrada)
    console.log(horaSalida)
    console.log(idHorario)
    console.log(descripcionActividad)
    console.log(idProfesor)*/
     
    let horaEntradaInt = parseInt(horaEntrada.split(':')[0]) 
    let horaSalidaInt = parseInt(horaSalida.split(':')[0]) 

    let horasCorrectas = horaEntradaInt < horaSalidaInt
    let descripcionVacia = descripcionActividad == '' 
    
    if(!horasCorrectas || descripcionVacia){
      if(!wrongFields) setWrongFields(true)
    }else{
      if(wrongFields) setWrongFields(false)
      const objActividad = { idHorario, horaEntrada, horaSalida, descripcionActividad, idProfesor}
      console.log('antes del dispatch', objActividad)
      dispatch(create(objActividad))
        .catch(() => {
          if(!wrongFields) setWrongFields(true)
        })
    }
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
  
  return (
    <SafeAreaView style = { styles.container }>
      <View style = { styles.header } >
        <View style = { styles.square } />
      </View>
      <View style = { styles.content } >
        <Text style = { styles.label } >SELECCIONE LA HORA DE INICIO</Text>
        <TouchableOpacity
          onPress = {() => setShowModalEntrada(true)}
          style = { styles.pickerContainer }
        >
          <View style = { styles.optionContainer }>
            <Text style = { styles.optionText }> { horaEntrada.split(':')[0] + ':00' } </Text>
            <Icon name = "caretdown" color = '#EAF4D3'/>
          </View>
          {showModalEntrada && (
            <Modal
              visible = { showModalEntrada }
              onRequestClose = {() => setShowModalEntrada(false)}
              transparent = { true }
            >
              <View style = { styles.modal }>
                {horas.map((hora, index) => (
                  <TouchableOpacity
                    key = { index }
                    onPress = {() => handlePickerPressEntrada(hora)}
                    style = { styles.pickerItem }
                  >
                    <Text style = { styles.pickerItemText }> { hora } </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Modal>
          )}
        </TouchableOpacity>
        <TextInput
          style = { styles.input }
          placeholder = '    Descripcion de la actividad'
          placeholderTextColor = '#EAF4D3' 
          onChangeText = { text => setDescripcionActividad(text) }
          value = { descripcionActividad }
        />
        <Text style = { styles.label } >SELECCIONE LA HORA DE TERMINO</Text>
        <TouchableOpacity
          onPress = {() => setShowModalSalida(true)}
          style = { styles.pickerContainer }
        >
          <View style = { styles.optionContainer }>
            <Text style = { styles.optionText }> { horaSalida.split(":")[0] + ':00' } </Text>
            <Icon name = "caretdown" color = '#EAF4D3'/>
          </View>
          {showModalSalida && (
            <Modal
              visible = { showModalSalida }
              onRequestClose = {() => setShowModal(false)}
              transparent = { true }
            >
              <View style = { styles.modal }>
                {horas.map((hora, index) => (
                  <TouchableOpacity
                    key = { index }
                    onPress = {() => handlePickerPressSalida(hora)}
                    style = { styles.pickerItem }
                  >
                    <Text style = { styles.pickerItemText }> { hora } </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Modal>
          )}
        </TouchableOpacity>
        <TouchableOpacity
            style = { styles.button }
            onPress = { handleAgregarActividad }
          >
            <Text style = { styles.buttonText } > AGREGAR ACTIVIDAD</Text>
        </TouchableOpacity> 
        <Text style = { styles.label }> { wrongFields ? 'CAMPOS INCORRECTOS' : '' } </Text>
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
    marginBottom: 10,
  },
  pickerContainer: {
    height: 154.333,
    alignItems: 'center',
    justifyContent: 'center'
  },
  optionContainer: {
    flexDirection: 'row',
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
    width: '80%',
    height: '65%',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: '50%',
    flexDirection: 'column',
  },
  pickerItem: {
    height: 30,
    margin: 10,
  },
  pickerItemText: {
    color: '#EAF4D3',
    fontWeight: 'bold',
  },
  input: {
    height: 48,
    width: 300,
    borderColor: '#ED6A5A',
    borderWidth: 5.333,
    marginBottom: 17.667,
    marginHorizontal: 37,
    paddingHorizontal: 8,
    color: '#EAF4D3',
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
})
