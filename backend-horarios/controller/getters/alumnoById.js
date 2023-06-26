const Alumno = require('../../model/Alumnos')

/**
 * Obtiene un alumno por su ID.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
const alumnoById = async (req, res) => {
  const idAlumno = req.query.idAlumno
  const alumno = await Alumno.findOne({ where: { id_alumno: idAlumno } })

  if (!alumno) {
    return res.status(404).json({ message: 'Alumno no encontrado' })
  } else {
    delete alumno.dataValues.password_alumno
    res.json(alumno.dataValues)
  }
}

module.exports = { alumnoById }

