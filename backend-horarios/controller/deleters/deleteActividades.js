const Actividad = require('../../model/Actividades.js')

/**
 * Elimina todas las actividades asociadas a un horario.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
const deleteActividades = async (req, res) => {
  console.log('en deleteActividades')
  const idHorario = req.query.idHorario
  const actividades = await Actividad.findAll({ where: { id_horario: idHorario } })

  if (!actividades) {
    console.log('no hay actividades')
    return res.status(404).json({ message: 'no existen actividades para este horario' })
  } else {
    await Actividad.destroy({ where: { id_horario: idHorario } })
    await Actividad.destroy({ where: { id_horario: null } })
    return res.status(200).json({ message: 'actividades eliminadas con exito' })
  }
}

module.exports = { deleteActividades }

