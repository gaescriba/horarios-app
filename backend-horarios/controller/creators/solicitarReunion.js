const Reunion = require('../../model/Reuniones')

/**
 * Solicita una nueva reunión.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Object} - Objeto de reunión solicitada.
 */
const solicitarReunion = async (req, res) => {
  const { horaEntrada, horaSalida, idProfesor, idAlumno, idHorario } = req.body

  try {
    const reunion = await Reunion.create({
      hora_inicio: horaEntrada,
      hora_termino: horaSalida,
      estado_reunion: 'pendiente',
      id_profesor: idProfesor,
      id_alumno: idAlumno,
      id_horario: idHorario
    })

    res.status(200).json(reunion)
  } catch (err) {
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

module.exports = { solicitarReunion }

