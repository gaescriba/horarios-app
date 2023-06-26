const Profesor = require('../../model/Profesores')

/**
 * Obtiene la lista de todos los profesores.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
const profesores = async (req, res) => {

  const profesores = await Profesor.findAll()
  if (!profesores) {
    return res.status(404).json({ message: 'No hay profesores' })
  } else {
    res.json({ profesores })
  }
}

module.exports = { profesores }

