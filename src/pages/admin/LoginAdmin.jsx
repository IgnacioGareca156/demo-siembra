import React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import useFormAdmin from '../../services/hooks/useFormAdmin'
import logo from './../../assets/logo.png'
import { CircularProgress } from '@mui/material'

const LoginAdmin = () => {
  const initialForm = {
    profesor_usuario: '',
    profesor_password: ''
  }

  const validate = (form) => {
    let errors= {}

    if (!form.profesor_usuario.trim()) {
      errors.profesor_usuario = "El campo 'Usuario' es requerido"
    }
    
    if (!form.profesor_password.trim()) {
      errors.profesor_password = "El campo 'Contraseña' es requerido"
    }
    return errors
  }

  const {
    form,
    errors,
    loading,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormAdmin(validate,initialForm)

  return (
    <>
       <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: {xs: 6, lg: 8},
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            component="img"
            sx={{ m:1, maxWidth: '310px'}}
            src={logo}
          >

          </Box>
          <Typography component="h1" variant="h5">
            Iniciar Sesión
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                error={errors?.profesor_usuario ? true : false}
                helperText={errors?.profesor_usuario}
                margin="normal"
                fullWidth
                id="profesor_usuario"
                label="Usuario"
                name="profesor_usuario"
                autoComplete="text"
                autoFocus
                onChange={handleChange}
                onBlur={handleBlur}
                value={form.profesor_usuario}
              />
              <TextField
                error={errors?.profesor_password ? true : false}
                helperText={errors?.profesor_password}
                margin="normal"
                fullWidth
                name="profesor_password"
                label="Contraseña"
                type="password"
                id="profesor_password"
                autoComplete="current-password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={form.profesor_password}
                
              />
              {errors?.profesor && 
                <Typography
                  sx={{
                    textAlign: 'center',
                    color: 'red',
                    fontSize: '0.9rem'
                  }}
                > 
                  {errors?.profesor}
                </Typography>
              }
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading ? true : false}
                sx={{ mt: 3, mb: 2 }}
              >
                {loading ?  <CircularProgress sx={{color: 'white'}} /> : 'Ingresar' }
              </Button>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default LoginAdmin
