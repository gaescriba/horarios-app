const Alumno = require('../../model/Alumnos')

/**
 * Obtiene la lista de todos los profesores.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
const alumnos = async (req, res) => {

  const alumnos = await Alumno.findAll()
  if (!alumnos) {
    return res.status(404).json({ message: 'No hay alumnos' })
  } else {
    res.json({ alumnos })
  }
}

module.exports = { alumnos }

