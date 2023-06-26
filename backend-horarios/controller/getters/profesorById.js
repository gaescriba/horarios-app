const Profesor = require('../../model/Profesores')

/**
 * Obtiene los detalles de un profesor por su ID.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
const profesorById = async (req, res) => {

  const idProfesor = req.query.idProfesor
  const profesor = await Profesor.findOne({ where: { id_profesor: idProfesor } })

  if (!profesor) {
    return res.status(404).json({ message: 'Profesor no encontrado' })
  } else {
    delete profesor.dataValues.password_profesor
    res.json(profesor.dataValues)
  }
}

module.exports = { profesorById }

