const { DataTypes } = require('sequelize');
const Profesor = require('./Profesores');
const sequelize = require('../sequelize');
const Horario = require('./Horarios');

/**
 * Modelo de datos para una actividad.
 * @typedef {Object} ActividadModel
 * @property {number} id_actividad - ID de la actividad.
 * @property {string} descripcion_actividad - Descripción de la actividad.
 * @property {string} hora_inicio - Hora de inicio de la actividad.
 * @property {string} hora_termino - Hora de finalización de la actividad.
 * @property {number} id_profesor - ID del profesor asociado a la actividad.
 * @property {number} id_horario - ID del horario asociado a la actividad.
 */

const Actividad = sequelize.define('Actividades', {
  id_actividad: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  descripcion_actividad: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  hora_inicio: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  hora_termino: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  id_profesor: {
    type: DataTypes.INTEGER,
  },
  id_horario: {
    type: DataTypes.INTEGER,
  },
});

/**
 * Relación de la actividad con un profesor.
 * @memberof ActividadModel
 * @function
 * @param {Profesor} Profesor - El modelo del profesor.
 * @param {Object} options - Opciones adicionales para la asociación.
 */
Actividad.belongsTo(Profesor, { foreignKey: 'id_profesor' });

/**
 * Relación de la actividad con un horario.
 * @memberof ActividadModel
 * @function
 * @param {Horario} Horario - El modelo del horario.
 * @param {Object} options - Opciones adicionales para la asociación.
 */
Actividad.belongsTo(Horario, { foreignKey: 'id_horario' });

module.exports = Actividad;

