import React, { useContext, useEffect, useState } from 'react'
import NuevoAlumno from '../../components/Alumno/NuevoAlumno'
import TablaAlumnos from '../../components/Alumno/TablaAlumnos'


const Alumnos = () => {    
    return (
        <>
            <h1>Alumnos</h1>
            <TablaAlumnos/>
            {/* <NuevoAlumno/> */}
        </>
    )
}

export default Alumnos
