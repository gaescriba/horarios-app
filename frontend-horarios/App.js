import * as React from 'react';

import { decode, encode } from 'base-64'
if(!global.btoa){
  global.btoa = encode
}
if(!global.atob){
  global.atob = decode
}

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

//screen de login 
import HomeScreen from './screens/loginScreens/HomeScreen.js'

//screens de profesor
import ProfesorDashboard from './screens/profesorScreens/ProfesorDashboard.js'

//screens de alumno
import AlumnoDashboard from './screens/alumnoScreens/AlumnoDashboard.js'
import BuscarProfesor from './screens/alumnoScreens/BuscarProfesor.js'

//screens de horario
import CrearHorario from './screens/horarioScreens/CrearHorario.js'
import ModificarHorario from './screens/horarioScreens/ModificarHorario.js'
import EliminarJornada from './screens/horarioScreens/EliminarJornada.js'

//screens de actividades
import AgregarActividad from './screens/actividadesScreens/AgregarActividad.js'
import ModificarActividad from './screens/actividadesScreens/ModificarActividad.js'
import EliminarActividad from './screens/actividadesScreens/EliminarActividad.js'

//screens de reuniones
import SolicitarReunion from './screens/reunionesScreens/SolicitarReunion.js'
import AceptarReunion from './screens/reunionesScreens/AceptarReunion.js'

//main screen
import VerHorario from './screens/main/VerHorario.js'

//configuracion de store
import store from './redux/store.js'
import { Provider } from 'react-redux';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store = { store }>
    <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name = "Home" component = { HomeScreen } />
          <Stack.Screen name = "ProfesorDashboard" component = { ProfesorDashboard } />
          <Stack.Screen name = "AlumnoDashboard" component = { AlumnoDashboard } />
          <Stack.Screen name = "CrearHorario" component = { CrearHorario } />
          <Stack.Screen name = "VerHorario" component = { VerHorario } />
          <Stack.Screen name = "ModificarHorario" component = { ModificarHorario } />
          <Stack.Screen name = "ModificarActividad" component = { ModificarActividad } />
          <Stack.Screen name = "AgregarActividad" component = { AgregarActividad } />
          <Stack.Screen name = "EliminarActividad" component = { EliminarActividad } />
          <Stack.Screen name = "BuscarProfesor" component = { BuscarProfesor } />
          <Stack.Screen name = "SolicitarReunion" component = { SolicitarReunion } />
          <Stack.Screen name = "AceptarReunion" component = { AceptarReunion } />
          <Stack.Screen name = "EliminarJornada" component = { EliminarJornada } />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
