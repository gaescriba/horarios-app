import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, ActivityIndicator } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { deleteZeros } from '../../helpers/deleteZeros.js'
import { checkTokenValidity } from '../../helpers/validator/checkToken.js'
import { getAll } from '../../redux/modules/reuniones/actions.js'
import { getAlumnos } from '../../redux/modules/alumno/actions.js'
import { accept } from '../../redux/modules/reuniones/actions.js'
import { reject } from '../../redux/modules/reuniones/actions.js'

export default Reuniones = () => {

  const navigation = useNavigation()

  const dispatch = useDispatch()

  const reunionesState = useSelector(state => state.reuniones?.reuniones)

  const horario = useSelector(state => state.horarios?.horario)

  const profesor = useSelector(state => state.profesor?.profesor)

  const alumno = useSelector(state => state.alumno?.alumno)
  
  const alumnosState = useSelector(state => state.alumno?.alumnos)


  const [reuniones, setReuniones] = useState([])
  const [alumnos, setAlumnos] = useState({})
  const [retrievedToken, setRetrievedToken] = useState(null)
  const [idProfesor, setIdProfesor] = useState(0)
  const [idAlumno, setIdAlumno] = useState(0)
  const [idHorario, setIdHorario] = useState(0)
  const [loading, setLoading] = useState(true)
  const [reload, setReload] = useState(false)
  const [isProfesor, setIsProfesor] = useState(false)
  const [showModalAccept, setShowModalAccept] = useState(false)
  const [showModalReject, setShowModalReject] = useState(false)
  const [nombres, setNombnres] = useState([])

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
      dispatch(getAlumnos())
        .catch(() => console.log('error en getAlumnos'))
      //console.log('idprofesor obtenido', retrievedToken?.idProfesor)
      if(retrievedToken?.idProfesor){
        setIdProfesor(retrievedToken.idProfesor)
        setIsProfesor(true)
      }else{
        console.log('no hay idProfesor', profesor)
        setIdAlumno(retrievedToken.idAlumno)
        if(profesor){
          console.log('hay profesor', profesor)
        }
      }
    }
  },[retrievedToken])

  useEffect(() => {
    if(alumnosState){
      console.log('alumnos', alumnosState)
      const alumnosObj = alumnosState.reduce((obj, alumno) => {
        obj[alumno.id_alumno] = alumno.nombre_alumno
        return obj
      }, {})
      console.log(alumnosObj)
      setAlumnos(alumnosObj)
      //const alumnosTemp = alumnosState.map(alumno => return)
    }
  },[alumnosState])

  useEffect(() => {
    if(horario){
      console.log('horario obtenido', horario.id_horario)
      setIdHorario(horario.id_horario)
    }
  },[horario])

  useEffect(() => {
    if(idProfesor != 0 && idHorario != 0){
      console.log('distinto de cero')
      dispatch(getAll(idProfesor, idHorario))
        .catch(err => console.log('error obteniendo reuniones', err))
    }
  }, [idProfesor, idHorario]) 

  useEffect(() => {
    if(reunionesState){
      console.log(reunionesState)
      setReuniones(reunionesState)
      setLoading(false)
    }
  },[reunionesState])

  useEffect(() => {
    if(idAlumno != 0){
      const reunionesTemp = reuniones.filter(reunion => reunion.estado_reunion === 'aceptada' && reunion.id_horario === idHorario || reunion.id_alumno === idAlumno && reunion.id_horario === idHorario)
      //console.log(reunionesTemp)
      setReuniones(reunionesTemp)
    }
  },[idAlumno])

  useEffect(() => {
    const unsuscribe = navigation.addListener('focus', () => {
      dispatch(getAll(idHorario))
        .catch(() => console.log('error'))
        .finally(() => {
          setReload(true)
          setLoading(false)
        })
    })
    return unsuscribe
  },[navigator, dispatch, idProfesor, idHorario, profesor])

  const handlePress = (option, idReunion) => {
    setReload(true)
    if(option){
      navigation.navigate("AceptarReunion", { id_reunion: idReunion })
    }else{
      navigation.navigate("RechazarReunion", { id_reunion: idReunion})
    }
  }

  const handleModalOptionsAccept = (option, idReunion = 0) => {
    if(option){
      dispatch(accept(idReunion))
        .then(() => {
          dispatch(getAll(idHorario))
        })
    }
    setShowModalAccept(false)
    navigation.navigate('VerHorario')
  }
  
  const handleModalOptionsReject = (option, idReunion = 0) => {
    if(option){
      dispatch(reject(idReunion))
        .then(() => {
          dispatch(getAll(idHorario))
        })
    }
    setShowModalReject(false)
    navigation.navigate('VerHorario')
  }
  
  useEffect(() => {
    const fetchData = () => {
      dispatch(getAll(idHorario))
      .catch(() => console.log('error en el reloader'))
      .finally(()=> setLoading(false))
    }

    const interval = setInterval(fetchData, 500)
    return () => clearInterval(interval)
  },[dispatch, idHorario])

  if(loading) return <View key = 'loading' style = { styles.container }>
    <View style = { styles.loadingContainer }>
            <Text style = { styles.loading }> CARGANDO... </Text>
            <ActivityIndicator
              size = { 100 }
              color = { '#EAF4D3' }
            />
          </View>
  </View>

   return (
    <ScrollView  contentContainerStyle = { styles.container }>
      {reuniones.length == 0 ? (
        <Text key = 'noReuniones' style = { styles.appointmentsEmpty }> NO HAY REUNIONES </Text>
      ) : (
        reuniones.map(reunion => (
          <View
            key = { reunion.id_reunion.toString() }
            style = { styles.appointment }
          >
            <View style = { styles.infoContainer } >
              <Text style = { styles.appointmentInfo }>REUNION { reunion?.estado_reunion?.toUpperCase() } </Text>
              <Text style = { styles.appointmentInfo } >SOLICIANTE: </Text>
              <Text style = { styles.appointmentInfo } >{ alumnos[reunion.id_alumno]?.toUpperCase() } </Text>
              <Text style = { styles.appointmentInfo } >{ deleteZeros(reunion.hora_inicio) } - { deleteZeros(reunion.hora_inicio) } </Text>
            </View>
            {isProfesor ? (
              <View>
                { reunion.estado_reunion === 'pendiente' && reunion.estado_reunion === 'pendiente' ? ( 
                  <>
                   <TouchableOpacity
                    style = { styles.button }
                    onPress = { () => setShowModalAccept(true) }
                  >
                    <View style = { styles.textContainer }>
                      <Text style = { styles.buttonText } > ACEPTAR </Text>
                    </View>
                    <Modal
                      visible = { showModalAccept }
                      transparent = { true }
                    >
                      <View style = { styles.modal }>
                        <View style = { styles.modalTextContainer }>
                          <Text style = { styles.modalText }> DESEA ACEPTAR LA REUNION?</Text>
                          <Text style = { styles.modalText }> ESTE CAMBIO ES IRREVERSIBLE</Text>
                        </View>
                        <View style = { styles.modalButtons }>
                          <TouchableOpacity
                            style = { styles.modalButton }
                            onPress = {() => handleModalOptionsAccept(true, reunion.id_reunion)}
                          >
                            <Text style = { styles.modalButtonText } > ACEPTAR </Text>
                          </TouchableOpacity> 
                          <TouchableOpacity
                            style = { styles.modalButton }
                            onPress = {() => handleModalOptionsAccept(false)}
                          >
                            <Text style = { styles.modalButtonText } > VOLVER </Text>
                          </TouchableOpacity> 
                        </View>
                      </View>
                    </Modal>
                  </TouchableOpacity> 
                   <TouchableOpacity
                    style = { styles.button }
                    onPress = { () => setShowModalReject(true) }
                  >
                    <View style = { styles.textContainer }>
                      <Text style = { styles.buttonText } > RECHAZAR </Text>
                    </View>
                    <Modal
                      visible = { showModalReject }
                      transparent = { true }
                    >
                      <View style = { styles.modal }>
                        <View style = { styles.modalTextContainer }>
                          <Text style = { styles.modalText }> DESEA RECHAZAR LA REUNION?</Text>
                          <Text style = { styles.modalText }> ESTE CAMBIO ES IRREVERSIBLE</Text>
                        </View>
                        <View style = { styles.modalButtons }>
                          <TouchableOpacity
                            style = { styles.modalButton }
                            onPress = {() => handleModalOptionsReject(true, reunion.id_reunion)}
                          >
                            <Text style = { styles.modalButtonText } > RECHAZAR </Text>
                          </TouchableOpacity> 
                          <TouchableOpacity
                            style = { styles.modalButton }
                            onPress = {() => handleModalOptionsReject(false)}
                          >
                            <Text style = { styles.modalButtonText } > VOLVER </Text>
                          </TouchableOpacity> 
                        </View>
                      </View>
                    </Modal>
                  </TouchableOpacity>   
                </>
                ): (
                  <View style = { styles.postAccept }>
               <TouchableOpacity
                    style = { styles.button }
                    onPress = { () => setShowModalReject(true) }
                  >
                    <View style = { styles.textContainer }>
                      <Text style = { styles.buttonText } > RECHAZAR </Text>
                    </View>
                    <Modal
                      visible = { showModalReject }
                      transparent = { true }
                    >
                      <View style = { styles.modal }>
                        <View style = { styles.modalTextContainer }>
                          <Text style = { styles.modalText }> DESEA RECHAZAR LA REUNION?</Text>
                          <Text style = { styles.modalText }> ESTE CAMBIO ES IRREVERSIBLE</Text>
                        </View>
                        <View style = { styles.modalButtons }>
                          <TouchableOpacity
                            style = { styles.modalButton }
                            onPress = {() => handleModalOptionsReject(true, reunion.id_reunion)}
                          >
                            <Text style = { styles.modalButtonText } > RECHAZAR </Text>
                          </TouchableOpacity> 
                          <TouchableOpacity
                            style = { styles.modalButton }
                            onPress = {() => handleModalOptionsReject(false)}
                          >
                            <Text style = { styles.modalButtonText } > VOLVER </Text>
                          </TouchableOpacity> 
                        </View>
                      </View>
                    </Modal>
                  </TouchableOpacity>  
                </View>
                )}
              </View> 
            ): (
            <>
            </>
            )}
          </View>
        )) 
      ) 
      }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container:{
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#323232',
    paddingHorizontal: 20,
    paddingVertical: 0
  },
  appointmentsEmpty : {
    color: '#EAF3D3',
    fontWeight: 'bold',
    justifyContent: 'center',
    marginVertical: 50
  },
  appointment: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomColor: '#EAF3D3',
    borderBottomWidth: 1,
  },
  infoContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  appointmentInfo: {
    color: '#EAF3D3',
    fontWeight: 'bold',
  },
  modal: {
    backgroundColor: '#323232',
    color: '#EAF4D3',
    borderColor: '#EAF4D3',
    borderWidth: 5,
    width: '80%',
    height: '65%',
    borderRadius: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: '50%',
    flexDirection: 'column',
  },
  modalTextContainer: {
    marginVertical: '50%',
  },
  modalText: {
    color: '#EAF4D3',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
  },
  modalButton: {
    backgroundColor: '#EAF4D3',
    height: 48,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  modalButtonText: {
    color: '#323232',
    fontWeight: 'bold',
  },

  button: {
    backgroundColor: '#EAF4D3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    width: 120,
    height: 38,
    marginBottom: 9,
  },
  buttonText: {
    color: '#323232',
    fontSize: 16,
    fontWeight: 'bold',
  },
  postAccept: {
    marginTop: 20,
  },
  picker:{
    width: 200,
  },
  loadingContainer: {
    marginVertical: '50%',
    alignItems: 'center',
  },
  loading: {
    color: '#EAF4D3',
    fontWeight: 'bold',
    paddingBottom: 30,
  },
});
