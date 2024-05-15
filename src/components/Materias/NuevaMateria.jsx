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
import { CircularProgress, InputLabel, MenuItem, Select } from '@mui/material';
import useForm from '../../services/hooks/useForm';
import { colores } from './colores';

const NuevoMateria = () => {
    const [open, setOpen] = useState(false);
    const [materiaNombre, setMateriaNombre] = useState('');
    const { state } = useContext(GlobalContext);
    const { post, get } = useFetch();
    const [successMessage, setSuccessMessage] = useState('')

    const initialForm = {
        materia_nombre: '',
        materia_color: colores[0].valor,
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
    useEffect(() => {
        getMaterias();
    }, []);

    const getMaterias = async () => {
        await get('Materia', 'GET_MATERIAS', {});
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setMateriaNombre('');
        setSuccessMessage(''); // Limpiar mensaje de éxito
    };

    const enviarDatos = async () => {
        try {
            await post(form, 'Materia', 'POST_MATERIA', {});
            setSuccessMessage('¡Operación Existosa!')

        } catch (error) {
            console.error('Error al agregar el materia:', error);
        } finally {
            setForm(initialForm)
            setTimeout(() => {
                if (successMessage !== '') {
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
                Nueva Materia
            </Button>
            <Dialog open={open} onClose={handleClose} PaperProps={{
                component: 'form',
                onSubmit: handleSubmit
            }}>
                <DialogTitle>Nueva Materia</DialogTitle>
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
                            <DialogContentText>Registre una nueva Materia</DialogContentText>
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

export default NuevoMateria;