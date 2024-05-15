import React, { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Checkbox, CircularProgress, FormControlLabel, InputLabel, MenuItem, Select } from '@mui/material';
import useForm from './../../services/hooks/useForm';
import useFetch from './../../services/hooks/useFetch';
import { GlobalContext } from '../../services/global.context';


export default function NuevoProfesor() {
    const [open, setOpen] = useState(false);
    const { post } = useFetch()
    const [successMessage, setSuccessMessage] = useState('')
    const { state } = useContext(GlobalContext)

    const initialForm = {
        profesor_nombre: '',
        profesor_apellido: '',
        profesor_admin: false,
        profesor_usuario: '',
        profesor_materia: '',
        profesor_password: 'pascalito2024',
    }

    const validate = (form) => {
        let errors = {}

        // if (!form.profesor_usuario.trim()) {
        //   errors.profesor_usuario = "El campo 'Usuario' es requerido"
        // }

        // if (!form.profesor_password.trim()) {
        //   errors.profesor_password = "El campo 'Contraseña' es requerido"
        // }
        return errors
    }

    const enviarDatos = async () => {
        try {
            // Realiza la operación POST con el formulario actual
            await post(form, 'Profesor', 'POST_PROFESOR', {})
            setSuccessMessage('¡Operación Existosa!')


            setForm(initialForm)
        } catch (error) {
            console.error('Error en la consulta', error);
        } finally {
            setForm(initialForm)
            setTimeout(() => {
                if (successMessage !== '') {
                    handleClose(); // Cerrar el diálogo después de 2 segundos
                }
            }, 4000);
        }
    }

    const {
        form,
        setForm,
        errors,
        loadingForm,
        handleBlur,
        handleChange,
        handleSubmit,
    } = useForm(validate,
        {
            profesor_nombre: '',
            profesor_apellido: '',
            profesor_admin: false,
            profesor_usuario: '',
            profesor_materia: '',
            profesor_password: 'pascalito2024',
        },
        enviarDatos)


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSuccessMessage(''); // Limpiar mensaje de éxito

    };

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen} sx={{ minWidth: 150, minHeight: { xs: 50 } }}>
                Nuevo Profesor
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: handleSubmit
                }}
            >
                <DialogTitle>Nuevo Profesor</DialogTitle>
                {successMessage ? ( // Mostrar mensaje de éxito si existe
                    <DialogContent>
                        <DialogContentText>
                            {successMessage}
                        </DialogContentText>
                        <DialogActions sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Button color='secondary' onClick={handleClose}>Cerrar</Button>
                        </DialogActions>
                    </DialogContent>
                ) : (
                    <>
                        <DialogContent>
                            <DialogContentText>
                                Registre un nuevo Profesor
                            </DialogContentText>
                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                id="profesor_nombre"
                                name="profesor_nombre"
                                label="Nombre"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={form.profesor_nombre}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={!!errors.profesor_nombre}
                                helperText={errors.profesor_nombre}
                            />
                            <TextField

                                required
                                margin="dense"
                                id="profesor_apellido"
                                name="profesor_apellido"
                                label="Apellido"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={form.profesor_apellido}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={!!errors.profesor_apellido}
                                helperText={errors.profesor_apellido}
                            />
                            <TextField

                                required
                                margin="dense"
                                id="profesor_usuario"
                                name="profesor_usuario"
                                label="Nombre de Usuario"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={form.profesor_usuario}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={!!errors.profesor_usuario}
                                helperText={errors.profesor_usuario}
                            />
                            <InputLabel id="materia-label" sx={{ mt: 2 }}>
                                Materia
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="profesor_materia"
                                value={form?.profesor_materia}
                                label="Materia"
                                onChange={handleChange}
                                sx={{ width: '100%' }}
                            >
                                {state.materias?.map((materia) => (
                                    <MenuItem value={materia.materia_id} key={materia.materia_id}>{materia.materia_nombre}</MenuItem>
                                ))}
                            </Select>

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        color="secondary"
                                        name="profesor_admin"
                                        id="profesor_admin"
                                        checked={form.profesor_admin}
                                        onChange={handleChange}
                                    />
                                }
                                label="Es administrador"
                            />

                        </DialogContent>
                        <DialogActions>
                            {loadingForm ? ( // Mostrar CircularProgress si loading es true
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                                    <CircularProgress />
                                </div>
                            ) : (
                                <>
                                    <Button color='secondary' onClick={handleClose}>Cancelar</Button>
                                    <Button color='success' type="submit">Registrar</Button>
                                </>
                            )}
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </React.Fragment>
    );
}