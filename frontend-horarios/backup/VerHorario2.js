import React, { useCallback, useEffect, useState } from 'react'
import { BackHandler, StyleSheet, SafeAreaView, TouchableOpacity, Text, View, ActivityIndicator } from 'react-native'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import { checkTokenValidity } from '../../helpers/validator/checkToken.js'
import TabNavigator from '../navigator/TabNavigator.js'
import Header from '../../components/Header.js'
import { useDispatch, useSelector } from 'react-redux'
import { getHorario } from '../../redux/modules/horario/actions.js'

export default VerHorario = () => {

  const dispatch = useDispatch()

  const isProfesor = useSelector(state => state.auth?.isProfesor)
  const horario = useSelector(state => state.horarios?.horario)
  const profesor = useSelector(state => state.profesor?.profesor)

  const isFocused = useIsFocused()

  const navigation = useNavigation()

  //const [idHorario, setIdHorario] = useState(0)
  const [dataHorario, setDataHorario] = useState([])
  const [retrievedToken, setRetrievedToken] = useState(null)
  //const [isProfesor, setIsProfesor] = useState(false)
  const [idProfesor, setIdProfesor] = useState(0)

  const handlePress = option => {
    switch(option){
      case 'buscar':
        navigation.navigate('BuscarProfesor')
      break
      case 'agregar':
        navigation.navigate('AgregarActividad')
      break
      case 'solicitar':
        navigation.navigate("SolicitarReunion", { id_profesor: idProfesor })
      break
      case 'modificar':
        navigation.navigate('ModificarHorario')
      break
      case 'eliminar':
        navigation.navigate('EliminarJornada')
      break
      case 'salir':
        navigation.navigate('Home')
      break
    }
  }

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
        if(profesor){
          //console.log(profesor.nombre_profesor)
          //console.log(profesor.id_profesor)
          setIdProfesor(profesor.id_profesor)
        }
      }
    }
  },[retrievedToken])

  useEffect(() => {
    if(horario){
      setDataHorario([horario])
    }
  },[horario])

  useEffect(() => {
    if(idProfesor != 0){
      //console.log('id profesor actualizado')
      dispatch(getHorario(idProfesor))
        .catch(err => console.log(`error en getHorario: ${err}`))
    }
  },[idProfesor])

  

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
    const handleHorarioUpdate = () => {
      if (horario){
        //console.log('horario actualizado', horario)
      }
    }
  },[horario])

   useEffect(() => {
    const backhandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      backhandler.remove();
    };
  }, [handleBackPress]);

  useEffect(() => {
    if (isFocused) {
      //console.log('Página enfocada. Horario:', horario);
    }
  }, [isFocused, horario]);

  return (
    <SafeAreaView style = { styles.container } >
      <View style = { styles.header }>
        <View style = { styles.square } />
      </View>
      <View style = { styles.content } >
        { horario &&  horario ? (
          <View style = { styles.componentsContainer } >
            <Header handlePress = { handlePress } isProfesor = { isProfesor } dataHorario = { horario } /> 
            <TabNavigator/>
            { isProfesor ? (
              <View style = { styles.profesorButtons } >
              <TouchableOpacity
                onPress = {() => handlePress('modificar')}
                 style = { styles.profesorButton }
              >
                <Text style = { styles.buttonText } > MODIFICAR </Text>
                <Text style = { styles.buttonText } > HORARIO </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress = {() => handlePress('salir')}
                 style = { styles.profesorButton }
              >
                <Text style = { styles.buttonText } > CERRAR SESION </Text>
              </TouchableOpacity>
              </View>
            ): (
            <View style = { styles.studentButtons }>
              <TouchableOpacity
                onPress = {() => handlePress('salir')}
                 style = { styles.studentButton }
              >
                <Text style = { styles.buttonText } > BUSCAR PROFESOR </Text>
              </TouchableOpacity>
            </View>
            )}
          </View>
        ):(
            <View style = { styles.loadingContainer } >
              <Text style = { styles.loadingText } > CARGANDO... </Text>
              <ActivityIndicator
                color = { '#EAF4D3' }
                size= { 100 }
              />
            </View>
        )}
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
    paddingTop: 29,
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
    marginTop: 15,
    justifyContent: 'center',
  },
  loadingContainer: {
    alignItems: 'center'
  },
  loadingText: {
    color: '#EAF4D3',
    fontWeight: 'bold',
    marginBottom: 30,
  },
  profesorButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  profesorButton: {
    backgroundColor: '#EAF4D3',
    justifyContent: 'center',
    marginHorizontal: 37,
    marginBottom: 17.667,
    marginTop: 17.667,
    alignItems: 'center',
    width: 160,
    height: 48,
  },
  studentButtons: {
  },
  studentButton: {
    backgroundColor: '#EAF4D3',
    justifyContent: 'center',
    marginBottom: 17.667,
    marginTop: 17.667,
    marginHorizontal: 23,
    alignItems: 'center',
    width: 360,
    height: 48,
  },
  buttonText: {
    color: '#323232',
    fontSize: 16,
    fontWeight: 'bold',
  },
})

