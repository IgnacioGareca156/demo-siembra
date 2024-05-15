import React, { useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { InputLabel, MenuItem, Select, Box, IconButton, CircularProgress } from '@mui/material';
import useFetch from '../../services/hooks/useFetch';
import useForm from '../../services/hooks/useForm';
import { GlobalContext } from '../../services/global.context';
import EditSharpIcon from '@mui/icons-material/EditSharp';

export default function EditarMeetDoc({ meetdoc_id }) {

    const [open, setOpen] = React.useState(false);
    const { update, getById } = useFetch()
    const { state } = useContext(GlobalContext)
    const [successMessage, setSuccessMessage] = useState('')

    const initialForm = {
        meetdoc_descripcion: '',
        meetdoc_link: '',
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
            // Realiza la operacion POST con el formulario actual
            await update(meetdoc_id, form, 'MeetDoc', 'UPDATE_MEETDOC', {})
            setSuccessMessage('¡Operación Existosa!')

        } catch (e) {
            console.error('Error en la consulta', e)
        } finally {
            setTimeout(() => {
                if(successMessage !== ''){
                    handleClose(); // Cerrar el diálogo después de 2 segundos
                }
            }, 4000);
        }
    };

    const {
        form,
        setForm,
        errors,
        loadingForm,
        handleBlur,
        handleChange,
        handleSubmit,
    } = useForm(validate, initialForm, enviarDatos)

    useEffect(() => {
        // Cuando cambia state.getAlumno, actualiza el estado del formulario
        setForm({
            meetdoc_id: state.getMeetDoc?.meetdoc_id || '',
            meetdoc_descripcion: state.getMeetDoc?.meetdoc_descripcion || '',
            meetdoc_link: state.getMeetDoc?.meetdoc_link || '',
        });
    }, [state.getMeetDoc])

    const handleClickOpen = () => {
        getById(meetdoc_id, 'MeetDoc', 'GET_MEETDOC', {})
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
                <DialogTitle>Editar Reunión</DialogTitle>
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
                                Edite los datos de la reunión
                            </DialogContentText>

                            <TextField
                                id="meetdoc_descripcion"
                                name="meetdoc_descripcion"
                                label="Descripción *"
                                multiline
                                rows={5}
                                variant="standard"
                                fullWidth
                                value={form.meetdoc_descripcion}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={!!errors.meetdoc_descripcion}
                                helperText={errors.meetdoc_descripcion}
                            />

                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                id="meetdoc_link"
                                name="meetdoc_link"
                                label="Link"
                                type="url"
                                fullWidth
                                variant="standard"
                                value={form.meetdoc_link}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={!!errors.meetdoc_link}
                                helperText={errors.meetdoc_link}
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