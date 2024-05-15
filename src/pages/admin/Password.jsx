
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import useFetch from '../../services/hooks/useFetch';
import { useContext } from 'react';
import { GlobalContext } from '../../services/global.context';
import useForm from '../../services/hooks/useForm';


export default function Password() {
  const { state, dispatch } = useContext(GlobalContext);
  const { update } = useFetch();
  const initialState = {
    profesor_password: '',
  };

  const validate = () => {
    const errors = {};
    if (!form.profesor_password.trim()) {
      errors.profesor_password = 'La contraseña es requerida';
    }
    return errors;
  };

  const changePassword = async () => {
    await update(state.admin.profesor_id, { ...state.admin, ...form }, 'Profesor', 'CHANGE_PASSWORD', {});
    await dispatch({ type: 'LOGOUT', payload: {} });
  };

  const { errors, handleSubmit, handleChange, form } = useForm(
    validate,
    initialState,
    changePassword
  );
  
  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Cambiar Contraseña
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Nueva Contraseña"
              type="password"
              id="profesor_password"
              name="profesor_password"
              autoComplete="current-password"
              onChange={handleChange}
              value={form?.profesor_password}
              error={!!errors.profesor_password}
              helperText={errors.profesor_password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Confirmar
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}
