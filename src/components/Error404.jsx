import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'


const Error404 = () => {
  return (
    <>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '600px',
      }}
    >
      <Typography
        variant="h3"
        sx={{
          color: 'black',
          marginBottom: '8px',
        }}
      >
        Error 404
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: 'black',
          marginBottom: '8px',
        }}
      >
        ¡Ups! Parece que esta página no existe.
      </Typography>
      <Button
        variant="contained"
        component={Link}
        to="/"
        sx={{
          color: 'black',
          backgroundColor: '#39C7F4',
          '&:hover': {
            backgroundColor: '#1e88e5',
          },
        }}
      >
        Ir a la página de inicio
      </Button>
    </Box>
    </>
  )
}

export default Error404
