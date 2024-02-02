const convertTo12HFormat = (time) =>{

    if(!time)
      return "00:00";

    const timeRegex = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]/

    const startRegex = time.match(timeRegex);
    


    const formatedTime = new Date('1970-01-01T' + startRegex[0] + 'Z')
  .toLocaleTimeString('en-US',
    {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'}
  )

  return formatedTime
}


const Converters = {
    convertTo12HFormat
}


export default Converters