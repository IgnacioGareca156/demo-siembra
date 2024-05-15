import React, { useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Checkbox, CircularProgress, FormControlLabel, IconButton, InputLabel, MenuItem, Select } from '@mui/material';
import useFetch from '../../services/hooks/useFetch';
import useForm from '../../services/hooks/useForm';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import { GlobalContext } from '../../services/global.context';

export default function EditarProfesor({ profesor_id }) {
    const [open, setOpen] = useState(false);
    const { update, getById } = useFetch()
    const { state } = useContext(GlobalContext);
    const [successMessage, setSuccessMessage] = useState('')

    const { errors, handleSubmit, handleChange, form, setForm, handleBlur, loadingForm } = useForm(
        validate,
        {
            profesor_id: '',
            profesor_nombre: '',
            profesor_apellido: '',
            profesor_usuario: '',
            profesor_admin: false, // Por defecto, el checkbox no está marcado
        },
        enviarDatos
    );

    function validate(form) {
        let errors = {};

        //validaciones

        return errors;
    }

    async function enviarDatos() {
        try {
            // Realiza la operación PUT con el formulario actual
            await update(profesor_id, form, 'Profesor', 'UPDATE_PROFESOR', {})
            setSuccessMessage('¡Operación Existosa!')
        } catch (error) {
            console.error('Error en la consulta', error);
        } finally {
            setTimeout(() => {
                if (successMessage !== '') {
                    handleClose(); // Cerrar el diálogo después de 2 segundos
                }
            }, 4000);
        }
    }

    useEffect(() => {
        // Cuando cambia state.getProfesor, actualiza el estado del formulario
        setForm({
            profesor_id: state.getProfesor?.profesor_id || '',
            profesor_nombre: state.getProfesor?.profesor_nombre || '',
            profesor_apellido: state.getProfesor?.profesor_apellido || '',
            profesor_usuario: state.getProfesor?.profesor_usuario || '',
            profesor_materia: state.getProfesor?.profesor_materia || '',
            profesor_admin: state.getProfesor?.profesor_admin || false,
        });
    }, [state.getProfesor]);


    const handleClickOpen = () => {
        getById(profesor_id, 'Profesor', 'GET_PROFESOR', {})
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSuccessMessage(''); // Limpiar mensaje de éxito

    };

    return (
        <React.Fragment>
            <IconButton color='' aria-label='editar' size='large' onClick={handleClickOpen}>
                <EditSharpIcon />
            </IconButton>

            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: handleSubmit
                }}
            >
                <DialogTitle>Editar Profesor</DialogTitle>
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
                                Edite los datos del Profesor
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
                                    <Button onClick={handleClose}>Cancelar</Button>
                                    <Button type="submit">Guardar Cambios</Button>
                                </>
                            )}
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </React.Fragment>
    );
}
