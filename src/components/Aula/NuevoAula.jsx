import React, { useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useFetch from './../../services/hooks/useFetch';
import { GlobalContext } from '../../services/global.context';
import { CircularProgress, Container } from '@mui/material';
import useForm from '../../services/hooks/useForm';

const NuevoAula = () => {
    const [open, setOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState('')
    const { state } = useContext(GlobalContext);
    const { post, get, loading } = useFetch();

    useEffect(() => {
        get('Aula', 'GET_AULAS', {})
    }, []);
    
    const initialForm = {
        aula_nombre: '',
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

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSuccessMessage(''); // Limpiar mensaje de éxito
    };

    const enviarDatos = async () => {
       
        try {
            await post(form, 'Aula', 'POST_AULA', {});
            await get('Aula', 'GET_AULAS', {}) // Actualiza la lista de aulas después de agregar una nueva aula
            setSuccessMessage('¡Operación Existosa!')
        } catch (error) {
            console.error('Error al agregar el aula:', error);
        } finally {
            setForm(initialForm)
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
    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen} sx={{ minWidth: 150, minHeight: { xs: 50 } }}>
                Nueva Aula
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: handleSubmit
                }}>
                <DialogTitle>Nueva Aula</DialogTitle>
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
                        <DialogContent >
                            <DialogContentText>Registre una nueva Aula</DialogContentText>
                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                id="aula_nombre"
                                name="aula_nombre"
                                label="Nombre"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={form.aula_nombre}
                                onChange={handleChange}
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
};

export default NuevoAula;
