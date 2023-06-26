import { useEffect, useState } from 'react';
import axios from 'axios';

export const useHorarios = (idProfesor, ipAddr) => {
  const [horario, setHorario] = useState([]);

  const fetchHorario = async () => {
    try {
      const response = await axios.get(
      `http://${ipAddr}:3000/getters/horariosByProfesor?idProfesor=${idProfesor}`
      )

      console.log('la data:')
      console.log(response.data)

      if (response && response.data) {
        setHorario(response.data);
      }
    } catch (error) {
      // Manejo del error
      console.error('Error al obtener el horario:', error);
      setHorario([])
    }
  };

  useEffect(() => {
    console.log('la id del profesor')
    console.log(idProfesor)
    fetchHorario();
  }, []);

  return { horario };
};

