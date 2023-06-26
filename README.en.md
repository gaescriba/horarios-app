# App Horarios
[![es](https://img.shields.io/badge/Spanish-d68c24)](https://github.com/gaescriba/horarios-app/blob/master/README.md)

A fullstack mobile app, developed as a personal project to showcase my knowledge in mobile app development.

#### Description

"app-horarios" was created to address a common issue inside my university in where students struggle to find teachers available during specific time slots for scheduling appointments or seeking assistance. The app allows teachers to create, update, or delete their own working schedules. On the student side, they can search for a specific teacher's schedule, request appointments, and view accepted or pending appointments.


#### Tech Stack

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

### Prerequisites

##### **MySQL**
You must have a MySQL instance available and configured, you can download MySQL from their [official website](https://www.mysql.com/)

##### **Node.js**
Ensure that you have the LTS(Long Term Support) version of Node.js installed in your machine. You can download it from their [official website](https://nodejs.org/)

##### **Expo CLI**
Expo CLI needs to be installed globally in you machine, you can install it running the following command in your terminal:
```npm install -g expo-cli```


## Deployment

#### Backend

1. Clone the repository to your machine.
2. Create a databse in your local MySQL instance, i highly recommend calling it "horarios".
3. Create a **.env** file in the root folder and fill it with the following data:
```
PORT=<the_port_where_you_want_the_backend_to_run_on>
DB_NAME=<database_name>
DB_USER=<MySQL_user_name>
DB_PASSWORD=<user_password>
```
4. Install the dependencies running ```npm install```
5. Start the backend server by runnning the command ```node .```

#### Frontend

1. Install the expo dependency by running the command ```npm install expo``` in the root folder.
2. Run ```npx expo install``` to ensure all other dependencies are installed correctly.
3. Update the **/helpers/getAddr.js** file and replace the value of **addr = 'your.local.ip.address'** with your local IP address. Make sure you don't use **localhost** or **127.0.0.1** as your IP Adress as Expo won't be able to connect to the backend.
4. Start the frontend server by running ```npm run start``` 
5. Scan the QR from your smartphone using Expo go app to epxlore the project's functionality

#### Pre-set Users

When the backend is first initialized, three users will be created with the following credentials:

Teacher 1:

- Email: **test1@mail.com**
- Password: 123

Teacher 2:

- Email: **test3@mail.com**
- Password: 12345

Student 1:

- Email : **test2@mail.com**
- Password: 1234

### Documentation

Documentation is currently available only for the backend. You can access it by opening the the **/out/index.html** file.
More documentation will be added soon.

### Known issues and future upgrades

Currently, there are no known issues. However, future upgrades will include creating more comprehensive documentation for both project layers, implementing SOLID principles, and making general code improvements.

## Coming soon

#### Docker

I'm currently working on dockerize the backend to simplify deployment.

#### Authentication

An additional security layer will be added for the login feature.

## Contributions

"app-horarios" was developed individually, and direct code contributions are not accepted at this time. However, I really appreciate your interest and willigness to colaborate.

If you have any suggestions, questions or comments related to the project, feel free to get in touch via email at gaescriba.trabajo@gmail.com. I'll be more than happy to answer your questions or recieve any feedback.

Thanks for your understanding and support!
