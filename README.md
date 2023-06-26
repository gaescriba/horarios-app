
# App Horarios
[![en](https://img.shields.io/badge/English-291ddb)](https://github.com/gaescriba/horarios-app/blob/master/README.en.md)

Una aplicación móvil fullstack desarrollada como parte de mi portafolio para demostrar mis conocimientos en el desarrollo de aplicaciones móviles fullstack.

#### Descripción

La aplicación "app-horarios" se creó para abordar la problemática común en mi universidad, donde los alumnos tienen dificultades para conocer los horarios disponibles de los profesores y así poder agendar reuniones o consultas. La aplicación permite a los profesores crear, modificar y eliminar su propio horario laboral, así como agregar, modificar o eliminar actividades. Por otro lado, los alumnos pueden buscar el horario de un profesor específico, solicitar reuniones y ver las reuniones aceptadas o pendientes solicitadas por ellos mismos.

#### Tecnologías utilizadas

+ MySQL
+ Node.js
+ Express.js
+ Sequelize
+ JWT
+ Expo
+ React Native
+ Redux
+ React Navigation
+ Axios
+ Redux Thunk

#### Prerequisitos

##### MySQL
Debes una instancia de MySQL disponible y configurada, puedes descargar e instalar MySQL desde su [sitio web oficial](https://www.mysql.com/)

##### Node.js
Asegúrate de tener Node.js instalado en tu sistema. Puedes descargar la última versión estable de Node.js [desde su sitio web oficial](https://nodejs.org/)

##### Expo CLI
Es necesario tener Expo CLI instalado globalmente en tu sistema. Puedes instalarlo ejecutando el siguiente comando en tu terminal:
```npm install -g expo-cli```


## Instalación

#### Backend

1. Clona el proyecto desde el repositorio
2. Crea una base de datos en tu instancia de MySQL con el nombre "horarios"
3. Crea un archivo **.env** en la carpeta raíz del proyecto y completa los siguientes datos:
```PORT=<tu_puerto>
DB_NAME=<nombre_de_la_base_de_datos>
DB_USER=<nombre_del_usuario_de_MySQL>
DB_PASSWORD=<contraseña_del_usuario>
```
4. Instala las dependencias con el comando ```npm install```
5. Ejecuta el comando ```node .``` para levantar el backend y generar los endpoints necesarios para el frontend.

#### Frontend

1. Desde la carpeta raíz del proyecto, ejecuta el comando ```npm install expo``` para instalar la dependencia de Expo.
2. Luego, ejecuta ```npx expo install``` para asegurarte de que todas las dependencias se instalen correctamente.
3. Modifica el archivo **/helpers/getAddr.js** y reemplaza el valor de **addr = 'your.local.ip.address'** en la en la línea 8 por la dirección IP de tu máquina. Asegúrate de que no usar **localhost** o **127.0.0.1** ya que Expo no podra apuntar corectamente al backend
4. Ejecuta el comando ```npm run start``` para iniciar el frontend
5. Escanea el QR generado desde la app Expo Go en tu smartphone para explorar el frontend

#### Usuarios predefinidos

Al levantar el backend, se crearán tres usuarios con las siguientes credenciales:

Profesor 1:

- Email: **test1@mail.com**
- Password: 123

Profesor 2:

- Email: **test3@mail.com**
- Password: 12345

Alumno 1:

- Email : **test2@mail.com**
- Password: 1234

## Documentación adicional

Por ahora, solo se cuenta con la documentación del backend, a la cual se puede acceder revisando el archivo **/out/index.html**.
Se generará más documentación a futuro.

## Problemas conocidos y mejoras futuras

Actualmente no hay problemas conocidos, pero se planea generar una documentación más completa para ambas capas del proyecto y realizar mejoras generales en el código, como limpieza e implementación de los principios SOLID, entre otros.

## Proximamente

#### Docker

Estoy trabajando para dockerizar el backend a fin de facilitar la puesta en funcionamento del proyecto

#### Auth

De igual forma, se agregara una capa de seguridad adicional para el login

## Contribuciones

El proyecto "app-horarios" ha sido desarrollado de manera individual y no se aceptan contribuciones directas al código en este momento. Sin embargo, aprecio el interés y la disposición para colaborar.

Si tienes alguna sugerencia, pregunta o comentario relacionado con el proyecto, no dudes en ponerte en contacto conmigo a través de mi correo electrónico gaescriba.trabajo@gmail.com. Estaré encantado de recibir comentarios o responder cualquier consulta.

Gracias por tu comprensión y apoyo!
