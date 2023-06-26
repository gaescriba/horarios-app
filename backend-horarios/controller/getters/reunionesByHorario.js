const Reunion = require('../../model/Reuniones')

/**
 * Obtiene las reuniones de un profesor por su ID.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
const reunionesByHorario = async (req, res) => {
  
  const {idHorario } = req.query  
  console.log('query', idHorario)
  const reuniones = await Reunion.findAll({
    where: {
      id_horario: idHorario
  }})


  if (!reuniones) {
    console.log('no hay reuniones')
    return res.status(404).json({ message: 'No existen reuniones' })
  } else {
    res.json({ reuniones })
  }
}

module.exports = { reunionesByHorario }

