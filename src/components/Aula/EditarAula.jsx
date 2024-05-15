import React, { useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, CircularProgress, IconButton, MenuItem, Select } from '@mui/material';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import useFetch from '../../services/hooks/useFetch';
import useForm from '../../services/hooks/useForm';
import { GlobalContext } from '../../services/global.context';

const EditarAula = ({ aula_id, aulaNombreInicial, aulas }) => {
    const [open, setOpen] = useState(false);
    const [aulaNombre, setAulaNombre] = useState(aulaNombreInicial);
    const { state } = useContext(GlobalContext);
    const { getById, update } = useFetch();
    const [successMessage, setSuccessMessage] = useState('')

    const validate = (form) => {
        let errors = {}
        // Puedes agregar validaciones si es necesario
        return errors
    }

    const handleClose = () => {
        setOpen(false);
        setSuccessMessage(''); // Limpiar mensaje de éxito
    };

    const enviarDatos = async () => {
        try {
            // Realiza la solicitud UPDATE con el formulario actualizado
            await update(aula_id, form, 'Aula', 'UPDATE_AULA', {});
            setSuccessMessage('¡Operación Existosa!')
        } catch (error) {
            console.log('Error en la consulta', error);
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
        aula_nombre: '',
    }, enviarDatos);


    useEffect(() => {
        setForm({
            aula_nombre: state.getAula?.aula_nombre || '',
        })
    }, [state.getAula])

    const handleClickOpen = () => {
        setOpen(true);
        getById(aula_id, 'Aula', 'GET_AULA', {});
    };

    return (
        <React.Fragment>
            <IconButton color="" aria-label="editar" size="large" onClick={handleClickOpen}>
                <EditSharpIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose} PaperProps={{
                component: 'form',
                onSubmit: handleSubmit
            }}>
                <DialogTitle>Editar Aula</DialogTitle>
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
                            <DialogContentText>Edite el nombre del aula</DialogContentText>
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
};

export default EditarAula;
