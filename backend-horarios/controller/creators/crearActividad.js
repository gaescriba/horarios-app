const Actividad = require('../../model/Actividades');

/**
 * Crea una nueva actividad.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Object} - Objeto de actividad creado.
 */
const crearActividad = async (req, res) => {
  
  const { idHorario, horaEntrada, horaSalida, descripcionActividad, idProfesor } = req.body;

  try {
    const hayActividad = await Actividad.findOne({ where: { descripcion_actividad: descripcionActividad } });

    if (hayActividad) {
      console.log('ya existe actividad');
      return res.status(409).json({ error: 'la actividad ya existe' });
    }

    const actividad = await Actividad.create({
      descripcion_actividad: descripcionActividad,
      hora_inicio: horaEntrada,
      hora_termino: horaSalida,
      id_profesor: idProfesor,
      id_horario: idHorario
    });

    res.status(200).json(actividad);
  } catch (err) {
    console.log(`error al crear actividad: ${err}`);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = { crearActividad };

