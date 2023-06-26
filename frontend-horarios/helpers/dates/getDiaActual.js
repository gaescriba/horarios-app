export const getDiaActual = () => {
  const date = new Date().toLocaleString('es-ES', { weekday: 'long' })
  const today = date.split(',')[0].toLowerCase()
  return today
}
