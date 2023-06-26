export const getFecha = () => {
  
  const today  = new Date().toLocaleString('es-ES', { weekday: 'long' })
  const diaSemana = today.split(',')[0]

  return diaSemana
}

