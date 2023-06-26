const Horario = require('../../model/Horarios')

/**
 * Modifica un horario.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
const modificarHorario = async (req, res) => {
  const { horaEntrada, horaSalida, idProfesor } = req.body

  try {
    const horario = await Horario.update(
      { hora_entrada: horaEntrada, hora_salida: horaSalida },
      { where: { id_profesor: idProfesor } }
    )

    res.status(200).json(horario)
  } catch (err) {
    console.log(`error al modificar horario: ${err}`)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

module.exports = { modificarHorario }

