import React, { useCallback, useEffect, useRef, useState } from 'react'
import { View, Text, BackHandler, StyleSheet, TouchableOpacity, SafeAreaView, Modal } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign.js'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { checkTokenValidity } from '../../helpers/validator/checkToken.js'
import { updateHorario, updatedFalse } from '../../redux/modules/horario/actions.js'


export default modificarHorario = () => {

  const profesor = useSelector(state => state.profesor?.profesor)
  const horarioUpdated = useSelector(state => state.horarios?.updated)

  const dispatch = useDispatch()

  const horarioUpdatedRef = useRef(false)
  
  const navigation = useNavigation()

  const [horaEntrada, setHoraEntrada] = useState('9:00')
  const [horaSalida, setHoraSalida] = useState('18:00')
  const [idProfesor, setIdProfesor] = useState(0)
  const [wrongFields, setWrongFields] = useState(false)
  const [hayHorario, setHayHorario] = useState(false)
  const [showModalEntrada, setShowModalEntrada] = useState(false)
  const [showModalSalida, setShowModalSalida] = useState(false)
  const [retrievedToken, setRetrievedToken] = useState(null)

  const horas = []
  
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


  const currentDate = new Date().toLocaleString('es-ES', { weekday: 'long' })
  const dayOfWeek = currentDate.split(',')[0]

  for(let i = 9; i <= 18; i++){
    const hora = i.toString().padStart(2, '0') + ':00'
    horas.push(hora)
  }

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
    if(horarioUpdated){
      dispatch(updatedFalse())
      horarioUpdatedRef.current = true
    }
  },[horarioUpdated])

  useEffect(() => {
    if(horarioUpdatedRef.current){
      navigation.navigate('VerHorario')
    }
  },[horarioUpdatedRef.current])
  
  let handleModificarHorario = () => {
  
    let horaEntradaFixed = horaEntrada.split(':')
    let lastItem = horaEntradaFixed.pop()
    let horaSalidaFixed = horaSalida.split(':')
    lastItem = horaSalidaFixed.pop()

    let horaEntradaInt = parseInt(horaEntradaFixed)
    let horaSalidaInt = parseInt(horaSalidaFixed)
    if(horaEntradaInt <= horaSalidaInt ){
      const putObj = { horaEntrada, horaSalida, idProfesor }
      console.log(putObj)
      dispatch(updateHorario(putObj))
        .catch(() => {
          if(!hayHorario) setHayHorario(!hayHorario)
        })
    }else{
      if(!wrongFields) setWrongFields(!wrongFields)
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
        <Text style = { styles.label } >SELECCIONE SU HORA DE ENTRADA</Text>
        <TouchableOpacity
          onPress = {() => setShowModalEntrada(true)}
          style = { styles.pickerContainer }
        >
          <View style = { styles.optionContainer }>
            <Text style = { styles.optionText }> { horaEntrada } </Text>
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
        <Text style = { styles.label } >SELECCIONE SU HORA DE SALIDA</Text>
        <TouchableOpacity
          onPress = {() => setShowModalSalida(true)}
          style = { styles.pickerContainer }
        >
          <View style = { styles.optionContainer }>
            <Text style = { styles.optionText }> { horaSalida } </Text>
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
            onPress = { handleModificarHorario }
          >
            <Text style = { styles.buttonText } > MODIFICAR HORARIO</Text>
        </TouchableOpacity> 
        <Text style = { styles.label }> { wrongFields ? 'CAMPOS INCORRECTOS' : '' } </Text>
        <Text> { hayHorario ? 'Ya existe un horario creado' : '' } </Text>
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
