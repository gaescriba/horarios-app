import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, TextInput, Button, StyleSheet, TouchableOpacity, PixelRatio } from "react-native"
import { useNavigation } from '@react-navigation/native'
import CheckBox from 'expo-checkbox'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/modules/auth/actions.js'

const HomeScreen = () => {

  const dispatch = useDispatch()
  const isLoggedIn = useSelector(state => state.auth?.isLoggedIn)

  const navigation = useNavigation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [missingFields, setMissingFields] = useState(false)
  const [isProfesor, setIsProfesor] = useState(false)
  const [wrongFields, setWrongFields] = useState(false)

  let triggerMissing = () => {
    setMissingFields(!missingFields)
  }

  let triggerWrong = () => {
    setWrongFields(!wrongFields)
  }

  const handleLogin = async () => {
    console.log('en funcion login')
    if(email == '' || password == ''){
      if(!missingFields){
        triggerMissing()
      }
    }else{
      if(missingFields){
        triggerMissing()
      }
      dispatch(login(email, password, isProfesor))
        .then(() => {
          const nextPage = isProfesor ? 'ProfesorDashboard' : 'AlumnoDashboard'
          navigation.navigate(nextPage)
        })
        .catch(() => {
          //console.log('en el catch')
          if(!wrongFields) triggerWrong()
        })
    }
  }

  /*useEffect(() => {
    if(isLoggedIn && typeof isProfesor === 'boolean'){
      const nextPage = isProfesor ? 'ProfesorDashboard': 'AlumnoDashboard'
      navigation.navigate(nextPage)
    }
  },[isLoggedIn, navigation, isProfesor])*/
  
  return(
    <SafeAreaView style = { styles.container }>
      <View style = { styles.header }>
        <View style = { styles.square }/>
      </View>
      <View style = { styles.content}>
        <TextInput
          style = { styles.input }
          placeholder = '    Correo electronico'
          placeholderTextColor = '#EAF4D3' 
          onChangeText = { text => setEmail(text) }
          value = { email }
        />
        <TextInput
          style = { styles.input }
          placeholder = '    Password'
          placeholderTextColor = '#EAF4D3' 
          onChangeText = { text => setPassword(text) }
          secureTextEntry = { true }
          value = { password }
        />
        <View style = { styles.checkboxContainer }>
          <CheckBox
            value = { isProfesor }
            onValueChange= { setIsProfesor }
            color = '#ED6A5A'         
          />
          <Text style = { styles.label }> Eres profesor? </Text>
        </View>
        <TouchableOpacity
        style = { styles.button }
        onPress = { handleLogin }
        >
          <Text style = { styles.buttonText } > INGRESAR </Text>
        </TouchableOpacity>
        <Text style = { styles.missingFields }> { missingFields ? 'NO PUEDEN HABER CAMPOS EN BLANCO' : '' } </Text>
        <Text style = { styles.missingFields }> { wrongFields ? 'EMAIL O PASSWORD INCORRECTOS' : '' } </Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
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
  },
  input: {
    height: 48,
    borderColor: '#ED6A5A',
    borderWidth: 5.333,
    marginBottom: 17.667,
    marginHorizontal: 37,
    paddingHorizontal: 8,
    color: '#EAF4D3',
  },
  button: {
    backgroundColor: '#EAF4D3',
    justifyContent: 'center',
    marginHorizontal: 37,
    alignItems: 'center',
    height: 48,
  },
  buttonText: {
    color: '#323232',
    fontSize: 16,
    fontWeight: 'bold',
  },
  missingFields: {
    marginTop: 16,
    color: '#EAF4D3',
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  checkboxContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    marginHorizontal: 37,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  checkboxSelected: {
    backgroundColor: '#ED6A5A',
  },
  label: {
    color: '#EAF4D3',
    marginRight: 10,
  },
})

export default HomeScreen

