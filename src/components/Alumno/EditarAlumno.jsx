import React, { useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { CircularProgress, IconButton, InputLabel, MenuItem, Select } from '@mui/material';
import useFetch from '../../services/hooks/useFetch';
import useForm from '../../services/hooks/useForm';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import { GlobalContext } from '../../services/global.context';

export default function EditarAlumno({ alumno_id, aulas }) {
    const [open, setOpen] = useState(false);
    const { state } = useContext(GlobalContext)
    const { getById, update } = useFetch()
    const sortedAulas = aulas?.sort((a, b) => a.aula_nombre.localeCompare(b.aula_nombre))
    const [successMessage, setSuccessMessage] = useState('')

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
            await update(alumno_id, form, 'Alumno', 'UPDATE_ALUMNO', {})
            setSuccessMessage('¡Operación Existosa!')
        } catch (error) {
            console.error('Error en la consulta', error);
        } finally {
            setTimeout(() => {
                if(successMessage !== ''){
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
    } = useForm(validate, {
        alumno_id: '',
        alumno_nombre: '',
        alumno_apellido: '',
        alumno_dni: '',
        alumno_aula: '',
    }, enviarDatos)

    useEffect(() => {
        // Cuando cambia state.getAlumno, actualiza el estado del formulario
        setForm({
            alumno_id: state.getAlumno?.alumno_id || '',
            alumno_nombre: state.getAlumno?.alumno_nombre || '',
            alumno_apellido: state.getAlumno?.alumno_apellido || '',
            alumno_dni: state.getAlumno?.alumno_dni || '',
            alumno_aula: state.getAlumno?.alumno_aula || '',
        });
    }, [state.getAlumno])

    const handleClickOpen = () => {
        getById(alumno_id, 'Alumno', 'GET_ALUMNO', {})
        setOpen(true)

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
                <DialogTitle>Editar Alumno</DialogTitle>
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
                                Registre un nuevo Alumno
                            </DialogContentText>
                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                id="alumno_nombre"
                                name="alumno_nombre"
                                label="Nombre"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={form.alumno_nombre}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={!!errors.alumno_nombre}
                                helperText={errors.alumno_nombre}
                            />
                            <TextField
                                required
                                margin="dense"
                                id="alumno_apellido"
                                name="alumno_apellido"
                                label="Apellido"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={form.alumno_apellido}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={!!errors.alumno_apellido}
                                helperText={errors.alumno_apellido}
                            />
                            <TextField
                                required
                                margin="dense"
                                id="alumno_dni"
                                name="alumno_dni"
                                label="DNI"
                                type="number"
                                fullWidth
                                variant="standard"
                                value={form.alumno_dni}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={!!errors.alumno_dni}
                                helperText={errors.alumno_dni}
                            />
                            <InputLabel id="demo-simple-select-label" sx={{ mt: 2 }}>Aula</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="alumno_aula"
                                value={form.alumno_aula}
                                label="Aula"
                                onChange={handleChange}
                                sx={{ width: '100%' }}
                            >
                                {sortedAulas?.map((aula) => (
                                    <MenuItem value={aula.aula_id} key={aula.aula_id}>{aula.aula_nombre}</MenuItem>
                                ))}
                            </Select>

                        </DialogContent>
                        <DialogActions>
                            {loadingForm ? ( // Mostrar CircularProgress si loading es true
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
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