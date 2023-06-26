import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import { deleteZeros } from '../../helpers/deleteZeros.js'
import { useDispatch, useSelector } from 'react-redux'
import { getAll } from '../../redux/modules/actividades/actions.js'
import { deleteItem } from '../../redux/modules/actividades/actions.js'

export default Actividades = () => {
  
  const dispatch = useDispatch()

  const horario = useSelector(state => state.horarios?.horario)

  const isProfesor = useSelector(state => state.auth?.isProfesor)
  
  const navigator = useNavigation()

  const [actividades, setActividades] = useState([])
  const [loading, setLoading] = useState(true)
  const [idHorario, setIdHorario] = useState(0)
  const [reload, setReload] = useState(false)
  const [showModalDelete, setShowModalDelete] = useState(false) 

  const actividadesState = useSelector(state => state.actividades?.actividades)

  useEffect(() =>{
    if(horario){
      //console.log('horario obtenido', horario.id_horario)
      setIdHorario(horario.id_horario)
    }
  },[horario])

  useEffect(() => {
    if(idHorario != 0){
      dispatch(getAll(idHorario))
    }
  },[idHorario])

  useEffect(() => {
    if(actividadesState){
      //console.log('actividades obtenidas', actividadesState)
      setActividades(actividadesState)
      setLoading(false)
    }
  },[actividadesState])

  useEffect(() => {
    const unsuscribe = navigator.addListener('focus', () => {
      console.log('en focus')
      dispatch(getAll(idHorario))
        .catch(() => console.log('error'))
        .finally(() => {
          setReload(true)
          setLoading(false)
        })
    })
    return () => unsuscribe
  },[navigator, dispatch, idHorario])


  const handlePress =  idActividad => {
      navigator.navigate("ModificarActividad", { id_actividad: idActividad })
  }

  const handleModalOptions = (option, idActividad = 0) => {
    if(option){
      dispatch(deleteItem(idActividad))
        .then(() => dispatch(getAll(idHorario)))
      setShowModalDelete(false)
      navigator.navigate('VerHorario')
    }else{
      setShowModalDelete(false)
    }
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
      {actividades.length == 0 ? (
        <Text key = 'noActividad' style = { styles.activityEmpty }> NO HAY ACTIVIDADES </Text>
      ):(
        actividades.map(actividad => (
          <View 
            key = { actividad.id_actividad.toString() }
            style = { styles.activity }
          >
            <View
              style = { styles.infoContainer }
            >
              <Text style = { styles.activityDescription } > { actividad?.descripcion_actividad?.toUpperCase() } </Text>
              <Text style = { styles.hours } >{ deleteZeros(actividad.hora_inicio) } - { deleteZeros(actividad.hora_termino) }</Text>
            </View>
            {isProfesor ? (
              <View>
                  <TouchableOpacity
                    style = { styles.button }
                    onPress = { () => handlePress(actividad.id_actividad) }
                  >
                    <View style = { styles.textContainer }>
                      <Text style = { styles.buttonText } > MODIFICAR </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style = { styles.button }
                    onPress = { () => setShowModalDelete(true) }
                  >
                    <View style = { styles.textContainer }>
                      <Text style = { styles.buttonText } > ELIMINAR </Text>
                    </View>
                    <Modal
                      visible = { showModalDelete }
                      transparent = { true }
                    >
                      <View style = { styles.modal }>
                        <View style = { styles.modalTextContainer }>
                          <Text style = { styles.modalText }> DESEA ELIMINAR LA ACTIVIDAD?</Text>
                          <Text style = { styles.modalText }> ESTE CAMBIO ES IRREVERSIBLE</Text>
                        </View>
                        <View style = { styles.modalButtons }>
                          <TouchableOpacity
                            style = { styles.modalButton }
                            onPress = {() => handleModalOptions(true, actividad.id_actividad)}
                          >
                            <Text style = { styles.modalButtonText } > ELIMINAR </Text>
                          </TouchableOpacity> 
                          <TouchableOpacity
                            style = { styles.modalButton }
                            onPress = {() => handleModalOptions(false)}
                          >
                            <Text style = { styles.modalButtonText } > VOLVER </Text>
                          </TouchableOpacity> 
                        </View>
                      </View>
                    </Modal>
                  </TouchableOpacity>
              </View>
            ):(
            <>
            </>
            )}
          </View>
        ))
      )}
      
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
    paddingVertical: 0,
  },
  activityEmpty : {
    color: '#EAF4D3',
    fontWeight: 'bold',
    justifyContent: 'center',
    marginVertical: 50,
  },
  activity: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomColor: '#EAF4D3',
    borderBottomWidth: 1,
  },
  infoContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  activityDescription: {
    color: '#EAF4D3',
    fontWeight: 'bold',
  },
  hours: {
    color: '#EAF4D3',
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

  picker:{
    width: 200,
  },
  button: {
    backgroundColor: '#EAF4D3',
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    height: 38,
    marginBottom: 9,
  },
  buttonText: {
    color: '#323232',
    fontSize: 16,
    fontWeight: 'bold',
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
