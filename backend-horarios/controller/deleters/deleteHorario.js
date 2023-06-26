const Horario = require('../../model/Horarios')

/**
 * Elimina un horario por su ID.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
const deleteHorario = async (req, res) => {
  const { idHorario } = req.query
  
  console.log('en eliminar horario')

  const horario = await Horario.findByPk(idHorario)

  if (!horario) {
    return res.status(404).json({ message: 'Horario no encontrado' })
  } else {
    await horario.destroy()
    console.log('horario eliminado')

    return res.status(200).json({ message: 'Horario eliminado correctamente' })
  }
}

module.exports = { deleteHorario }

