const { DataTypes } = require('sequelize')
const sequelize = require('../sequelize')
const Profesor = require('./Profesores')

/**
 * Modelo de datos para los horarios.
 * @typedef {Object} HorarioModel
 * @property {number} id_horario - ID del horario.
 * @property {string} dia_semana - Día de la semana del horario.
 * @property {string} hora_entrada - Hora de entrada del horario.
 * @property {string} hora_salida - Hora de salida del horario.
 * @property {number} id_profesor - ID del profesor asociado al horario.
 */

/**
 * Modelo de datos para un horario.
 * @type {HorarioModel}
 */
const Horario = sequelize.define('Horario', {
  id_horario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  dia_semana: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  hora_entrada: {
    type: DataTypes.TIME,
    allowNull: false
  },
  hora_salida: {
    type: DataTypes.TIME,
    allowNull: false
  }
})

/**
 * Relación del horario con un profesor.
 * @memberof HorarioModel
 * @function
 * @param {ProfesorModel} Profesor - El modelo del profesor.
 * @param {Object} options - Opciones adicionales para la asociación.
 */
Horario.belongsTo(Profesor, { foreignKey: 'id_profesor' })

module.exports = Horario

