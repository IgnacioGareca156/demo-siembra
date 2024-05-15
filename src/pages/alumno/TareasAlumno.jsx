import { Typography } from '@mui/material'
import React from 'react'



const TareasAlumno = () => {

  return (
    <>
        <Typography component={'h1'} variant='h1' sx={{fontSize: '2rem'}}>
            Bienvenido Alumno
        </Typography>
        <Typography variant='subtitle1' sx={{my: '15px'}}>
            Listado de Tareas
        </Typography> 
        
    </>
  )
}

export default TareasAlumno
