const Horario = require('../../model/Horarios')

/**
 * Crea un nuevo horario.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Object} - Objeto de horario creado.
 */
const crearHorario = async (req, res) => {
  const { horaEntrada, horaSalida, idProfesor } = req.body

  const date = new Date()
  const options = { weekday: 'long' }
  const diaDeHoy = date.toLocaleString('es-ES', options)

  try {
    const hayHorario = await Horario.findOne({ where: { dia_semana: diaDeHoy } })

    if (hayHorario) {
      console.log('ya existe horario')
      return res.status(409).json({ error: 'El horario ya existe' })
    }

    const horario = await Horario.create({
      dia_semana: diaDeHoy,
      hora_entrada: horaEntrada,
      hora_salida: horaSalida,
      id_profesor: idProfesor
    })

    res.status(200).json(horario)
  } catch (err) {
    console.log(`error al crear horario: ${err}`)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

module.exports = { crearHorario }

