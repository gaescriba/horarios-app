const Reunion= require('../../model/Reuniones.js')

/**
 * Elimina todas las reuniones asociadas a un horario.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
const deleteReuniones = async (req, res) => {
  console.log('en deleteReuniones')
  const idHorario = req.query.idHorario
  const reuniones = await Reunion.findAll({ where: { id_horario: idHorario } })

  if (!reuniones) {
    console.log('no hay reuniones')
    return res.status(404).json({ message: 'no existen reuniones para este horario' })
  } else {
    await Actividad.destroy({ where: { id_horario: idHorario } })
    await Actividad.destroy({ where: { id_horario: null } })
    return res.status(200).json({ message: 'reuniones eliminadas con exito' })
  }
}

module.exports = { deleteReuniones }

