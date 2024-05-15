import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../services/global.context';
import useFetch from '../../services/hooks/useFetch';
import TablaAlumnos from '../../components/Alumno/TablaAlumnos';
import TablaLibretaAlumnos from '../../components/Libreta/TablaAlumnosLibreta';

const LibretaNotas = () => {
  const [aula, setAula] = useState('00872faf-0b59-4431-ae18-b1f2e0f27e73')
  const { state } = useContext(GlobalContext);

  const handleChange = (event) => {
    setAula(event.target.value);
  }
  return (
    <>
      <h1>Libreta</h1>


      {/* Seleccionar Aula */}
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={aula}
          label="Age"
          onChange={handleChange}
        >

        {state.aulas.map(aula => (
          <MenuItem key={aula.aula_id} value={aula.aula_id}>{aula.aula_nombre}</MenuItem>
        ))}
          
        </Select>
      </FormControl>


        {/* Tabla con los alumnos */}
        <TablaLibretaAlumnos aula={aula}/>
        
    </>
  )
}

export default LibretaNotas
