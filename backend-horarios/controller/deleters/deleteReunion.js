const Reunion = require('../../model/Reuniones')

/**
 * Elimina un horario por su ID.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
const deleteReunion = async (req, res) => {
  const { idReunion } = req.query
  
  console.log('en eliminar reunion')

  const reunion = await Reunion.findByPk(idReunion)

  if (!reunion) {
    return res.status(404).json({ message: 'reunion no encontrada' })
  } else {
    await reunion.destroy()
    console.log('reunion eliminada')

    return res.status(200).json({ message: 'Reunion eliminada correctamente' })
  }
}

module.exports = { deleteReunion }

