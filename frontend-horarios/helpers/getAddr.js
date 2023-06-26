export const getAddr = () => {

  let addr = 0
  let option = 1 
  
  switch(option){
    case 1:
      addr = '192.168.0.10'
    break
    case 2:
      addr = '192.168.106.63' 
    break
    case 3:
      addr = '10.28.17.235' 
    break
    
  }

  return addr
}
