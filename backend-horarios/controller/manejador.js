const express = require('express');
const router = express.Router();

// Creators
const { crearActividad } = require('./creators/crearActividad.js');
const { crearHorario } = require('./creators/crearHorario.js');
const { solicitarReunion } = require('./creators/solicitarReunion.js');

// Getters
const { actividadesByHorario } = require('./getters/actividadesByHorario.js');
const { alumnoById } = require('./getters/alumnoById.js');
const { login } = require('./getters/login.js');
const { profesorById } = require('./getters/profesorById.js');
const { profesores } = require('./getters/profesores.js');
const { alumnos } = require('./getters/alumnos.js')
const { reunionesByHorario } = require('./getters/reunionesByHorario.js');
const { horariosByProfesor } = require('./getters/horariosByProfesor.js')

// Updaters
const { aceptarReunion } = require('./updaters/aceptarReunion.js');
const { modificarActividad } = require('./updaters/modificarActividad.js');
const { modificarHorario } = require('./updaters/modificarHorario.js');

// Deleters
const { deleteActividades } = require('./deleters/deleteActividades.js');
const { deleteActividad } = require('./deleters/deleteActividad.js');
const { deleteHorario } = require('./deleters/deleteHorario.js');
const { deleteReunion } = require('./deleters/deleteReunion.js');
const { deleteReuniones } = require('./deleters/deleteReuniones.js')

/**
 * Rutas para crear recursos.
 */

/**
 * Crea una nueva actividad.
 * @name POST /crearActividad
 * @function
 */
router.post('/crearActividad', crearActividad);

/**
 * Crea un nuevo horario.
 * @name POST /crearHorario
 * @function
 */
router.post('/crearHorario', crearHorario);

/**
 * Solicita una reunión.
 * @name POST /solicitarReunion
 * @function
 */
router.post('/solicitarReunion', solicitarReunion);


/**
 * Rutas para obtener recursos.
 */

/**
 * Obtiene las actividades por horario.
 * @name GET /actividadesByHorario
 * @function
 */
router.get('/actividadesByHorario', actividadesByHorario);

/**
 * Obtiene un alumno por su ID.
 * @name GET /alumnoById
 * @function
 */
router.get('/alumnoById', alumnoById);

/**
 * Obtiene los horarios por profesor.
 * @name GET /horariosByProfesor
 * @function
 */
router.get('/horariosByProfesor', horariosByProfesor);

/**
 * Inicia sesión.
 * @name POST /login
 * @function
 */
router.post('/login', login);

/**
 * Obtiene un profesor por su ID.
 * @name GET /profesorById
 * @function
 */
router.get('/profesorById', profesorById);

/**
 * Obtiene la lista de profesores.
 * @name GET /profesores
 * @function
 */
router.get('/profesores', profesores);
/**
 * Obtiene la lista de alumnos.
 * @name GET /alumnos
 * @function
 */
router.get('/alumnos', alumnos);

/**
 * Obtiene las reuniones por profesor.
 * @name GET /reunionesByProfesor
 * @function
 */
router.get('/reunionesByHorario', reunionesByHorario);


/**
 * Rutas para actualizar recursos.
 */

/**
 * Acepta una reunión.
 * @name PUT /aceptarReunion
 * @function
 */
router.put('/aceptarReunion', aceptarReunion);

/**
 * Modifica una actividad existente.
 * @name PUT /modificarActividad
 * @function
 */
router.put('/modificarActividad', modificarActividad);

/**
 * Modifica un horario existente.
 * @name PUT /modificarHorario
 * @function
 */
router.put('/modificarHorario', modificarHorario);


/**
 * Rutas para eliminar recursos.
 */

/**
 * Elimina varias actividades.
 * @name DELETE /deleteActividades
 * @function
 */
router.delete('/deleteActividades', deleteActividades);

/**
 * Elimina una actividad.
 * @name DELETE /deleteActividad
 * @function
 */
router.delete('/deleteActividad', deleteActividad);

/**
 * Elimina un horario.
 * @name DELETE /deleteHorario
 * @function
 */
router.delete('/horario', deleteHorario);

/**
 * Elimina una reunión.
 * @name DELETE /deleteReunion
 * @function
 */
router.delete('/deleteReunion', deleteReunion);

/**
  * Elimina varias reuniones
  * @name DELETE /deleteReuniones
  * @function
  */
router.delete('/deleteReuniones', deleteReuniones)

module.exports = router;

