import { combineReducers } from 'redux'
import authReducer from './auth/reducers'
import profesorReducer from './profesor/reducers'
import horariosReducer from './horario/reducers'
import actividadesReducer from './actividades/reducers'
import reunionesReducer from './reuniones/reducers'
import alumnoReducer from './alumno/reducers'

const rootReducer = combineReducers({
  auth: authReducer,
  profesor: profesorReducer,
  horarios: horariosReducer,
  actividades: actividadesReducer,
  reuniones: reunionesReducer,
  alumno: alumnoReducer,
})

export default rootReducer
