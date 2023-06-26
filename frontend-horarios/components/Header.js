import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native'
import { deleteZeros } from '../helpers/deleteZeros'

export default Header = ({  handlePress, isProfesor, dataHorario }) => {

  const [options, setOptions] = useState(['','','',''])
  const [showModalLogout, setShowModalLogout] = useState(false)
  
  useEffect(() => {
    const profesorOptions = ['AGREGAR ACTIVIDAD', 'agregar', 'ELIMINAR JORNADA', 'eliminar']
    const alumnoOptions = ['Pedir Reunion', 'solicitar', 'Cerrar Sesion', 'salir']
    isProfesor ? setOptions(profesorOptions) : setOptions(alumnoOptions)
  },[])

  const handleModalOptions = option => {
    if(option){
      handlePress('salir')
    }else{
      setShowModalLogout(false)
    }
  }
  
  return (
    <View style = { styles.header }>
      <View style = { styles.infoContainer }>
        <Text style = {styles.text}>{ dataHorario?.dia_semana?.toUpperCase() }</Text>
        <Text style = {styles.hours}>   { deleteZeros(dataHorario?.hora_entrada) } - { deleteZeros(dataHorario?.hora_salida) }</Text>
      </View>
      <View style = {styles.buttonContainer}>
          <View style = {styles.buttonContainer}>
            <TouchableOpacity
              style = { styles.button }
              onPress = { () => handlePress(options[1]) }
            >
              <View style = { styles.textContainer }>
                <Text style = { styles.buttonText } > {  options[0] } </Text>
              </View>
          </TouchableOpacity>
          <View style = { styles.space } />
          <TouchableOpacity
              style = { styles.button }
              onPress = { () => setShowModalLogout(true) }
            >
            <View style = { styles.textContainer }>
                <Text style = { styles.buttonText } > { options[2] } </Text>
            </View>
            <Modal
              visible = { showModalLogout }
              transparent = { true }
            >
              <View style = { styles.modal }>
                <View style = { styles.modalTextContainer }>
                  <Text style = { styles.modalText }> DESEA ELIMINAR LA JORNADA?</Text>
                  <Text style = { styles.modalText }> ESTE CAMBIO ES IRREVERSIBLE</Text>
                </View>
                <View style = { styles.modalButtons }>
                  <TouchableOpacity
                    style = { styles.modalButton }
                    onPress = {() => handleModalOptions(true)}
                  >
                    <Text style = { styles.modalButtonText } > SALIR </Text>
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
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  hours: {
    color: '#EAF4D3',
    fontWeight: 'bold',
  },
  text: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#EAF4D3',
    marginLeft: 10,
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
  buttonContainer: {
    flexDirection: 'row'
  },
  button: {
    backgroundColor: '#EAF4D3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    width: 120 ,
    height: 48,
  },
  buttonText: {
    color: '#323232',
    fontSize: 16,
    fontWeight: 'bold',
  },
})


