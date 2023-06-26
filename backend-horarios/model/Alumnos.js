const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize.js');

/**
 * Modelo de datos para los alumnos.
 * @typedef {Object} AlumnoModel
 * @property {number} id_alumno - ID del alumno.
 * @property {string} nombre_alumno - Nombre del alumno.
 * @property {string} email_alumno - Correo electrónico del alumno.
 * @property {string} password_alumno - Contraseña del alumno.
 */

/**
 * Modelo de datos para representar un alumno.
 * @type {AlumnoModel}
 */
const Alumno = sequelize.define('Alumno', {
  id_alumno: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre_alumno: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email_alumno: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  password_alumno: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
});

module.exports = Alumno;

