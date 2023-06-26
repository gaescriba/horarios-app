import React, { useCallback, useEffect, useRef, useState } from 'react'
import { View, Text, BackHandler, StyleSheet, TouchableOpacity, Modal, SafeAreaView } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign.js'
import { useNavigation, useRoute } from '@react-navigation/native'
import { checkTokenValidity } from '../../helpers/validator/checkToken.js'
import { useDispatch, useSelector } from 'react-redux'
import { solicitar } from '../../redux/modules/reuniones/actions.js'
import { createdFalse } from '../../redux/modules/reuniones/actions.js'


export default SolicitarReunion = () => {

  const route = useRoute()

  const idProfesor = route.params?.id_profesor

  const dispatch = useDispatch()

  const profesor = useSelector(state => state.profesor?.profesor)

  const horario = useSelector(state => state.horarios?.horario)

  const reunionCreated = useSelector(state => state.reuniones?.reunionCreated)
    
  const navigation = useNavigation()

  const isReunionCreatedRef = useRef(false)

  const [horaEntrada, setHoraEntrada] = useState('')
  const [horaSalida, setHoraSalida] = useState('')
  const [retrievedToken, setRetrievedToken] = useState(null)
  const [idAlumno , setIdAlumno] = useState(0)
  const [idHorario, setIdHorario] = useState(0)
  const [wrongFields, setWrongFields] = useState(false)
  const [showModalEntrada, setShowModalEntrada] = useState(false)
  const [showModalSalida, setShowModalSalida] = useState(false)
  const [horas, setHoras] = useState([])

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
      //console.log('si ke hay token')
      //console.log(retrievedToken.idProfesor)
      if(retrievedToken?.idProfesor){
        setIdProfesor(retrievedToken.idProfesor)
      }else{
        setIdAlumno(retrievedToken.idAlumno)
        if(profesor){
          console.log(profesor.nombre_profesor)
        }
      }
    }
  },[retrievedToken, profesor])

  useEffect(() => {
    if(horario){
      setHoraEntrada(horario.hora_entrada)
      setHoraSalida(horario.hora_salida)
      setIdHorario(horario.id_horario)

      const horasTemp = []

      const horaEntradaInt = parseInt(horario.hora_entrada.split(':')[0])
      const horaSalidaInt = parseInt(horario.hora_salida.split(':')[0])
      console.log(horaEntradaInt, horaSalidaInt)

      for(let i = horaEntradaInt; i < horaSalidaInt + 1; i++ ){
        horasTemp.push(i + ':00')
      }
      setHoras(horasTemp)
    }
  },[horario])
  
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

  
  useEffect(() => {
    console.log('evaluando reunionCreated', reunionCreated)
    if(reunionCreated){
      console.log('reunion solicitada')
      dispatch(createdFalse())
      isReunionCreatedRef.current = true
    }
  },[reunionCreated])

  useEffect(() => {
    if(isReunionCreatedRef.current){
      console.log('id profesor', idProfesor)
      navigation.navigate('VerHorario', { idProfesor: idProfesor })
    }
  },[isReunionCreatedRef.current])

    let handleSolicitarActividad = () => {

    let horaEntradaInt = parseInt(horaEntrada.split(':')[0]) 
    let horaSalidaInt = parseInt(horaSalida.split(':')[0]) 

    let horasCorrectas = horaEntradaInt < horaSalidaInt
    
    if(!horasCorrectas){
      if(!wrongFields) setWrongFields(true)
    }else{
      if(wrongFields) setWrongFields(false)
      objReunion = {  horaEntrada, horaSalida, idAlumno, idProfesor, idHorario }
      //console.log('antes del dispatch')
      //console.log(objReunion)
      dispatch(solicitar(objReunion))
        .catch(err => console.log(`error: ${err}`))
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
        <Text style = { styles.label } >CONSEJO: </Text>
        <Text style = { styles.label } >SOLICITA TU REUNION EN UNA HORA LIBRE</Text>
        <Text style = { styles.label } ></Text>
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
            onPress = { handleSolicitarActividad }
          >
            <Text style = { styles.buttonText } > SOLICITAR REUNION</Text>
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
