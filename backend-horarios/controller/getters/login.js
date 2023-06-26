const jwt = require('jsonwebtoken')

const Profesor = require('../../model/Profesores.js')
const Alumno = require('../../model/Alumnos.js')

const jwtConfig = {
  secret: 'pepito',
  expiresIn: '30m',
}

/**
 * Realiza el inicio de sesión de un usuario.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
const login = async (req, res) => {
  console.log('en funcion login')
  const { email, password, isProfesor } = req.body
  try {
    if (isProfesor) {
      const profesor = await Profesor.findOne({ where: { email_profesor: email } })

      if (!profesor) {
        return res.status(401).json({ message: 'No encontrado' })
      } else {
        const passwordValida = password == profesor.dataValues.password_profesor

        if (!passwordValida) {
          return res.status(401).json({ message: 'Contraseña incorrecta' })
        } else {
          const token = jwt.sign({ idProfesor: profesor.dataValues.id_profesor }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn })
          res.json({ token })
        }
      }
    } else {
      console.log('en login alumno')
      const alumno = await Alumno.findOne({ where: { email_alumno: email } })
      console.log(alumno.dataValues)

      if (!alumno) {
        console.log('no se encontró el alumno')
        return res.status(401).json({ message: 'No encontrado' })
      } else {
        console.log('se encontró el alumno')
        const passwordValida = password == alumno.dataValues.password_alumno

        if (!passwordValida) {
          console.log('contraseña inválida')
          return res.status(401).json({ message: 'Contraseña incorrecta' })
        } else {
          console.log('contraseña válida')
          const token = jwt.sign({ idAlumno: alumno.dataValues.id_alumno }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn })
          res.json({ token })
        }
      }
    }
  } catch (err) {
    return res.status(401).json({ message: 'Error en autenticación' })
  }
}

module.exports = { login }

