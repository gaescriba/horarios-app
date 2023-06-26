export const deleteZeros = hour => {
  let hourSplit = hour?.split(':') 
  let deletedZeros = hourSplit === undefined ? '' : `${hourSplit[0]}:00`
  const result = deletedZeros === '' ? '' : deletedZeros
  return result 
}
