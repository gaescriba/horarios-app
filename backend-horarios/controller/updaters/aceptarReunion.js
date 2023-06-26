const Reunion = require('../../model/Reuniones.js')

/**
 * Acepta una reunión.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
const aceptarReunion = async (req, res) => {
  console.log('en aceptarReunion')

  const { idReunion } = req.body

  console.log(idReunion)

  try {
    const reunion = await Reunion.update({ estado_reunion: 'aceptada' }, { where: { id_reunion: idReunion } })

    res.status(200).json(reunion)
  } catch (err) {
    console.log(`error al modificar reunion: ${err}`)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

module.exports = { aceptarReunion }

