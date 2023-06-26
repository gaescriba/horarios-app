const { DataTypes } = require('sequelize')
const sequelize = require('../sequelize.js')

/**
 * Modelo de datos para los profesores.
 * @typedef {Object} ProfesorModel
 * @property {number} id_profesor - ID del profesor.
 * @property {string} nombre_profesor - Nombre del profesor.
 * @property {string} email_profesor - Correo electrónico del profesor.
 * @property {string} password_profesor - Contraseña del profesor.
 */

/**
 * Modelo de datos para un profesor.
 * @type {ProfesorModel}
 */
const Profesor = sequelize.define('Profesor', {
  id_profesor: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre_profesor: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  email_profesor: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  password_profesor: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
  tableName: "Profesores"
})

module.exports = Profesor

