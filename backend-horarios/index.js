require('dotenv').config()
/**
 * Configuración del token JWT.
 * @typedef {Object} JwtConfig
 * @property {string} secret - La clave secreta para firmar el token.
 * @property {string} expiresIn - La duración de tiempo de vida del token.
 */

/** @type {JwtConfig} */
const jwtConfig = {
  secret: 'pepito',
  expiresIn: '30m'
}

const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')

const sequelize = require('./sequelize.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const manejador = require('./controller/manejador.js')

const Profesor = require('./model/Profesores.js')
const Alumno = require('./model/Alumnos.js')
const Horario = require('./model/Horarios.js')
const Actividad = require('./model/Actividades.js')
const Reunion = require('./model/Reuniones.js')

const app = express()
const port = process.env.PORT || 3000

/**
 * Función asincrónica para insertar un profesor en la base de datos.
 * @async
 * @returns {Promise<void>}
 */
let insertProfesor = async () => {
  const juanMir = await Profesor.create({ nombre_profesor: 'Juan Mir', email_profesor: 'test1@mail.com', password_profesor: '123' })
}

/**
 * Función asincrónica para insertar otro profesor en la base de datos.
 * @async
 * @returns {Promise<void>}
 */
let insertProfesor2 = async () => {
  const juanMir = await Profesor.create({ nombre_profesor: 'Juan Miro', email_profesor: 'test3@mail.com', password_profesor: '123' })
}

/**
 * Función asincrónica para insertar un alumno en la base de datos.
 * @async
 * @returns {Promise<void>}
 */
let insertAlumno = async () => {
  const pepitoPalotes = await Alumno.create({ nombre_alumno: 'Perico de los palotes', email_alumno: 'test2@mail.com', password_alumno: '1234' })
}

/**
 * Función asincrónica para insertar actividades en la base de datos.
 * @async
 * @returns {Promise<void>}
 */
let insertActividades = async () => {
  const act1 = await Actividad.create({ descripcion_actividad: 'Reunion directiva', hora_inicio: '10:00', hora_termino: '13:00', id_profesor: 1, id_horario: 5 })
  const act2 = await Actividad.create({ descripcion_actividad: 'Reunion profesores', hora_inicio: '15:00', hora_termino: '16:00', id_profesor: 1, id_horario: 5 })
}

/** 
 * Indica si se debe forzar la sincronización de la base de datos.
 * @type {boolean} 
 */
let forceFlag = false

app.use(cors())
app.use(express.json())
app.use('/creators', manejador)
app.use('/getters', manejador)
app.use('/updaters', manejador)
app.use('/deleters', manejador)

/**
 * Sincroniza la base de datos con Sequelize.
 * @returns {Promise<void>}
 */
const syncDb = () => {
  sequelize.sync()
    .then(() => {
      console.log('Base de datos sincronizada')
      insertProfesor()
      insertProfesor2()
      insertAlumno()
    })
    .catch(err => console.log(`Error al sincronizar la base de datos ${err}`))
  }

/**
 * Inicia el servidor Express en el puerto especificado.
 * @returns {void}
 */
app.listen(port, () => {
  syncDb()
  console.log(`Server running on port: ${port}`)
})
