const { DataTypes } = require('sequelize')
const sequelize = require('../sequelize')
const Profesor = require('./Profesores')
const Alumno = require('./Alumnos')
const Horario = require('./Horarios')

/**
 * Modelo de datos para las reuniones.
 * @typedef {Object} ReunionModel
 * @property {number} id_reunion - ID de la reunión.
 * @property {string} hora_inicio - Hora de inicio de la reunión.
 * @property {string} hora_termino - Hora de finalización de la reunión.
 * @property {string} estado_reunion - Estado de la reunión.
 * @property {number} id_profesor - ID del profesor asociado a la reunión.
 * @property {number} id_alumno - ID del alumno asociado a la reunión.
 * @property {number} id_horario - ID del horario asociado a la reunión.
 */

/**
 * Modelo de datos para una reunión.
 * @type {ReunionModel}
 */
const Reunion = sequelize.define('Reunion', {
  id_reunion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  hora_inicio: {
    type: DataTypes.TIME,
    allowNull: false
  },
  hora_termino: {
    type: DataTypes.TIME,
    allowNull: false
  },
  estado_reunion: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: "Reuniones"
})

/**
 * Relación de la reunión con un profesor.
 * @memberof ReunionModel
 * @function
 * @param {ProfesorModel} Profesor - El modelo del profesor.
 * @param {Object} options - Opciones adicionales para la asociación.
 */
Reunion.belongsTo(Profesor, { foreignKey: 'id_profesor' })

/**
 * Relación de la reunión con un alumno.
 * @memberof ReunionModel
 * @function
 * @param {AlumnoModel} Alumno - El modelo del alumno.
 * @param {Object} options - Opciones adicionales para la asociación.
 */
Reunion.belongsTo(Alumno, { foreignKey: 'id_alumno' })

/**
 * Relación de la reunión con un horario.
 * @memberof ReunionModel
 * @function
 * @param {HorarioModel} Horario - El modelo del horario.
 * @param {Object} options - Opciones adicionales para la asociación.
 */
Reunion.belongsTo(Horario, { foreignKey: 'id_horario' })

module.exports = Reunion

