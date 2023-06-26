const Horario = require('../../model/Horarios.js')

/**
 * Obtiene los horarios de un profesor por su ID.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
const horariosByProfesor = async (req, res) => {
  const idProfesor = req.query.idProfesor
  console.log('id profesor', idProfesor)
  const horario = await Horario.findOne({ where: { id_profesor: idProfesor } })

  if (!horario) {
    console.log('no hay horario')
    return res.status(404).json({ message: 'no existe horario para el profesor' })
  } else {
    console.log(horario)
    res.json({ horario })
  }
}

module.exports = { horariosByProfesor }

