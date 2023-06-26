import React, { useCallback, useEffect, useRef, useState } from 'react'
import { View, Text, BackHandler, StyleSheet, Button, ActivityIndicator, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { checkTokenValidity } from '../../helpers/validator/checkToken.js'
import { useDispatch, useSelector } from 'react-redux'
import { getProfesor } from '../../redux/modules/profesor/actions.js'
import { deleteHorario, getHorario } from '../../redux/modules/horario/actions.js'
import { getDiaActual } from '../../helpers/dates/getDiaActual.js'
import { deleteAll } from '../../redux/modules/actividades/actions.js'
import { getAddr } from '../../helpers/getAddr.js'

export default ProfesorDashboard = () => {

  const dispatch = useDispatch()
  const profesor = useSelector(state => state.profesor?.profesor)
  const horario = useSelector(state => state.horarios?.horario)
  const isHorarioDeleted = useSelector(state => state.horarios?.deleted)
  const isActividadesDeleted = useSelector(state => state.actividades?.allDeleted)

  const isHorarioDeletedRef = useRef(false)
  
  const ipAddr = getAddr()

  const navigation = useNavigation()

  const [retrievedToken, setRetrievedToken] = useState(null)
  const [nombreProfesor, setNombreProfesor] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [idProfesor, setIdProfesor] = useState(0)
  const [hayHorario, setHayHorario] = useState(false)
  const [sameDay, setSameDay] = useState(true)
  const [idHorario, setIdHorario] = useState(0)
  const [reloader, setReloader] = useState(false)
  
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
    if(isHorarioDeleted){
    }
  },[isHorarioDeleted])

  useEffect(() => {
    if(retrievedToken){
      //console.log('id profesor', retrievedToken.idProfesor)
      dispatch(getProfesor(retrievedToken.idProfesor))
        .catch(err => console.log('error en dispatch de profesor: ', err))
    }
  },[retrievedToken])

  useEffect(() => {
    if(profesor && profesor.nombre_profesor){
      //console.log('profesor: ', profesor)
      setNombreProfesor(profesor.nombre_profesor)
    }
    
    if(profesor){
      //console.log('id del profesor', profesor.id_profesor)
      setIdProfesor(profesor.id_profesor)
      dispatch(getHorario(profesor.id_profesor))
        .catch(err => console.log('error en el dispatch de horario: ', err))
    }
  },[profesor])

  useEffect(() => {
    if(horario){
      const today = getDiaActual()
      //console.log('today: ', today)
      //console.log('dia de horario', horario.dia_semana)
      setSameDay(today == horario.dia_semana)
      setHayHorario(true)
    }else{
    }
  },[horario, profesor])

  let handlePress = () => {
    //console.log(`sameDay: ${sameDay}`)
    if(!sameDay){
      //console.log(`eliminar horario id: ${horario.id_horario}`)
      const idHorario = horario.id_horario
      const deleteHorarioDispatch = dispatch(deleteHorario(idHorario))
      const deleteActividadesDispatch = dispatch(deleteAll(idHorario))
      Promise.all([deleteHorarioDispatch, deleteActividadesDispatch])
        .then(() => {
          setSameDay(true)
          setHayHorario(false)
        })
        .catch(err => setSameDay(true))
    }else{
      let nextPage = hayHorario ? 'VerHorario' : 'CrearHorario'
      navigation.navigate(nextPage)
    }
  }

  const handleBackPress = useCallback(() => {
    return true
  },[reloader])

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress)
    
    return () => {
      backHandler.remove()
    }
  }, [handleBackPress])
  
  return (
    <View style = { styles.container }>
      <View style = { styles.header }>
        <View style = { styles.square } />
      </View>
      <View style = { styles.content }>
        { nombreProfesor ? (
          <>
          <Text style = { styles.text }> BIENVENIDO { nombreProfesor?.toUpperCase() } </Text>
          <Text style = { styles.text }>{ sameDay ? '' : 'DEBE ELIMINAR EL ULTIMO HORARIO'  }</Text>
        { sameDay ? (
          <TouchableOpacity
             style = { styles.button }
             onPress = { () => handlePress() }
          >
            <Text style = { styles.buttonText } > { hayHorario ?  'VER HORARIO' : 'CREAR HORARIO' } </Text>
          </TouchableOpacity> 
        ): (
            <TouchableOpacity
             style = { styles.button }
             onPress = { () => handlePress() }
            >
              <Text style = { styles.buttonText } > ELIMINAR HORARIO </Text>
            </TouchableOpacity>
          ) }
        </>
        ) : (
          <View style = { styles.loadingContainer }>
            <Text style = { styles.loading }> CARGANDO... </Text>
            <ActivityIndicator
              size = { 100 }
              color = { '#EAF4D3' }
            />
          </View>
        )}
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
    paddingTop: 29,
  },
  text: {
    textAlign: 'center',
    color: '#EAF4D3',
    fontWeight: 'bold',
    marginBottom: 30,
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
  loadingContainer: {
    alignItems: 'center'
  },
  loading: {
    color: '#EAF4D3',
    fontWeight: 'bold',
    paddingBottom: 30,
  }
})
