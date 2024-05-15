import React, { useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton, CircularProgress, InputLabel, Select, MenuItem } from '@mui/material';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import useFetch from '../../services/hooks/useFetch';
import useForm from '../../services/hooks/useForm';
import { GlobalContext } from '../../services/global.context';
import { colores } from './colores';

const EditarMateria = ({ materia_id, materiaNombreInicial, materias }) => {
    const [open, setOpen] = useState(false);
    const [materiaNombre, setAulaNombre] = useState(materiaNombreInicial);
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
            await update(materia_id, form, 'Materia', 'UPDATE_MATERIA', {});
            setSuccessMessage('¡Operación Existosa!')

        } catch (error) {
            console.log('Error en la consulta', error);
        } finally {
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
    } = useForm(validate, {
        materia_nombre: '',
    }, enviarDatos);


    useEffect(() => {
        setForm({
            materia_nombre: state.getMateria?.materia_nombre || '',
            materia_color: state.getMateria?.materia_color || '',
            
        })
    }, [state.getMateria])

    const handleClickOpen = () => {
        setOpen(true);
        getById(materia_id, 'Materia', 'GET_MATERIA', {});
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
                            <DialogContentText>Edite el nombre del materia</DialogContentText>
                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                id="materia_nombre"
                                name="materia_nombre"
                                label="Nombre"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={form.materia_nombre}
                                onChange={handleChange}
                            />
                            <InputLabel id="materia-label" sx={{ mt: 2 }}>
                                Color
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="materia_color"
                                value={form.materia_color}
                                label="Aula"
                                onChange={handleChange}
                                sx={{ width: '100%', backgroundColor: form.materia_color }}
                            >

                                {colores?.map((color) => (
                                    <MenuItem value={color.valor} key={color.nombre}>{color.nombre}</MenuItem>
                                ))}
                            </Select>
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

export default EditarMateria;
