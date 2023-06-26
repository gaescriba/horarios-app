import react from 'react'
import { StyleSheet } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Actividades from './Actividades.js' 
import Reuniones from './Reuniones.js'

const Tab = createMaterialTopTabNavigator()

export default TabNavigator = () => {
  return(
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12, backgroundColor: '#323232' },
        tabBarItemStyle: { backgroundColor: '#323232' },
        tabBarActiveTintColor: '#EAF4D3',
        tabBarIndicatorStyle: styles.tabIndicator,
      }}
    >
      <Tab.Screen name = "Actividades" key = 'actividades'>
        { props => <Actividades styles = { styles.activities } /> }
      </Tab.Screen>
      <Tab.Screen name = "Reuniones" key = 'reuniones'>
        { props => <Reuniones /> }
      </Tab.Screen>
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  navigator: {
    backgroundColor: '#323232',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#323232'
  },
  tabIndicator: {
    backgroundColor: '#EAF4D3'
  },
  tabText: {
    textAlign: 'center',
  },
  activities: {
    maxHeight: 130,
    backgroundColor: 'red'
  },
})
