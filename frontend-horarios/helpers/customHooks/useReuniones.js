import { useEffect, useState } from 'react';
import axios from 'axios';

export const useReuniones = (idProfesor, ipAddr) => {
  const [reuniones, setReuniones] = useState([]);

  const fetchReuniones = async () => {
    try {
      const response = await axios.get(
        `http://${ipAddr}:3000/getters/reunionesByProfesor?idProfesor=${idProfesor}`
      );

      if (response && response.data['reuniones']) {
        setReuniones(response.data['reuniones']);
      }
    } catch (error) {
      // Manejo del error
      console.error('Error al obtener las reuniones:', error);
      setReuniones([])
    }
  };

  useEffect(() => {
    fetchReuniones();
  }, []);

  return { reuniones };
};

