import React, { useContext, useEffect } from 'react';
import { Grid, Paper, Typography, Button, Box } from '@mui/material';
import { GlobalContext } from '../services/global.context';
import useFetch from '../services/hooks/useFetch';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const { loading, get } = useFetch(); 
  


  useEffect(() => {
    get('Alumno', 'GET_ALUMNOS',{limit : -1}); // Realiza una llamada para obtener la lista de alumnos al cargar el dashboard
    get('Profesor', 'GET_PROFESORES'); // Realiza una llamada para obtener la lista de alumnos al cargar el dashboard
    get('Aula', 'GET_AULAS', {
      sort: ['sort','aula_nombre']
    }); // Realiza una llamada para obtener la lista de alumnos al cargar el dashboard
    get('Materia', 'GET_MATERIAS'); // Realiza una llamada para obtener la lista de alumnos al cargar el dashboard
  }, []);


  return (
    <Grid >
    <Box width="100%" pt={3} aligncontent='center' >
      <Grid container spacing={3} >
        <Grid item xs={12} sm={6} md={6} mb={3} >
        <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
      <Typography variant="h6">Cantidad de Alumnos: {state.alumnos?.length - 9 }</Typography>
      <Button component={Link} to="/panel/alumnos" variant="contained" color="primary" style={{ marginTop: '10px' }}>Ver Alumnos</Button>
    </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={6} mb={3} >
        <Paper elevation={3} style={{ padding: '20px ', textAlign: 'center' }}>
      <Typography variant="h6">Cantidad de Aulas: {state.aulas?.length}</Typography>
      <Button component={Link} to="/panel/aulas" variant="contained" color="primary" style={{ marginTop: '10px' }}>Ver Aulas</Button>
    </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={6} mb={3}>
        <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
      <Typography variant="h6">Cantidad de Materias: {state.materias?.length}</Typography>
      <Button component={Link} to="/panel/materias" variant="contained" color="primary" style={{ marginTop: '10px' }}>Ver Materias</Button>
    </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={6} mb={3} >
        <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
      <Typography variant="h6">Cantidad de Profesores: {state.profesores?.length - 3}</Typography>
      <Button component={Link} to="/panel/profesor" variant="contained" color="primary" style={{ marginTop: '10px' }}>Ver Profesores</Button>
    </Paper>
        </Grid>
      </Grid>
    </Box>
  </Grid>
  );
};

export default Dashboard;
