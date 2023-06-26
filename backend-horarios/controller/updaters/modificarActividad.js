const Actividad = require('../../model/Actividades')

/**
 * Modifica una actividad.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
const modificarActividad = async (req, res) => {
  const { horaEntrada, horaSalida, descripcionActividad, id_actividad } = req.body

  console.log(id_actividad)
  console.log(descripcionActividad)
  
  const updateObj = descripcionActividad.trim() == '' ? 
    {
      hora_inicio: horaEntrada,
      hora_termino: horaSalida
    } 
    :
    {
      descripcion_actividad: descripcionActividad,
      hora_inicio: horaEntrada,
      hora_termino: horaSalida
    }
    

  try {
    const actividad = await Actividad.update( updateObj,
    {
      where: { id_actividad: id_actividad }
    })

    res.status(200).json(actividad)
  } catch (err) {
    console.log(`error al modificar Actividad: ${err}`)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

module.exports = { modificarActividad }

