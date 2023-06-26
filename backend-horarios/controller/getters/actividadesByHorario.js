const Actividad = require('../../model/Actividades.js')

/**
 * Obtiene las actividades por horario.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
const actividadesByHorario = async (req, res) => {
  const idHorario = req.query.idHorario
  const actividades = await Actividad.findAll({ where: { id_horario: idHorario } })

  if (!actividades) {
    return res.status(404).json({ message: 'No existen actividades' })
  } else {
    console.log(actividades)
    res.json({ actividades })
  }
}

module.exports = { actividadesByHorario }

