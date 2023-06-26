const Actividad = require('../../model/Actividades.js')

/**
 * Elimina una actividad por su ID.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
const deleteActividad = async (req, res) => {
  const { idActividad } = req.query

  console.log('id actividad por front:')
  console.log(idActividad)

  const actividad = await Actividad.findByPk(idActividad)

  if (!actividad) {
    return res.status(404).json({ message: 'Actividad no encontrada' })
  } else {
    await actividad.destroy()
    console.log('actividad eliminada')

    return res.status(200).json({ message: 'Actividad eliminada correctamente' })
  }
}

module.exports = { deleteActividad }

