import { useEffect, useState } from 'react';
import axios from 'axios';
import { getAddr } from '../getAddr.js'

export const useActividades = (idHorario, ipAddr) => {
  
  const [actividades, setActividades] = useState([]);

  console.log(`http://${ipAddr}:3000/getters/actividadesByHorario?idHorario=${idHorario}`)


  const fetchActividades = async () => {
    try {
      const response = await axios.get(
        `http://${ipAddr}:3000/getters/actividadesByHorario?idHorario=${idHorario}`
      );

      if (response && response.data) {
        console.log('actividades')
        console.log(response.data['actividades'])
        setActividades(response.data['actividades']);
      }
    } catch (error) {
      // Manejo del error
      //console.log('Error al obtener las actividades:', error);
      setActividades([])
    }
  };

  useEffect(() => {
    fetchActividades();
  }, []);

  return { actividades };
};

