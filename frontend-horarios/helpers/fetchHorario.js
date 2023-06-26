import axios from 'axios';

export const fetchHorario = async (idProfesor, ipAddr) => {
  try {
    const response = await axios.get(
      `http://${ipAddr}:3000/getters/horariosByProfesor?idProfesor=${idProfesor}`
    );

    if (response && response.data) {
      return response.data['horario'];
    }
  } catch (error) {
    // Manejo del error
    console.log('Error al obtener el profesor:', error);
  }

  return null;
};

