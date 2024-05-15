import React, { useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { InputLabel, MenuItem, Select, Box, CircularProgress } from '@mui/material';
import useFetch from '../../services/hooks/useFetch';
import useForm from '../../services/hooks/useForm';
import { GlobalContext } from '../../services/global.context';

export default function NuevoVideo() {

    const [open, setOpen] = React.useState(false);
    const { get, post } = useFetch()
    const { state } = useContext(GlobalContext)
    const sortedAulas = state.aulas.sort((a, b) => a.aula_nombre.localeCompare(b.aula_nombre))
    const [successMessage, setSuccessMessage] = useState('')


    useEffect(() => {
        get('Aula', 'GET_AULAS', {})
        get('Materia', 'GET_MATERIAS', {})
    }, [])

    const initialForm = {
        video_descripcion: '',
        video_link: '',
        video_aula: '',
        video_materia: '',
        video_profesor: state.admin?.profesor_id,
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
            await post(form, 'Video', 'POST_VIDEO', {})
            setSuccessMessage('¡Operación Existosa!')

        } catch (error) {
            console.error('Error en la consulta', error)
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
                Nuevo Video
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: handleSubmit
                }}
            >
                <DialogTitle>Nuevo Video</DialogTitle>
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
                                Registre un Video
                            </DialogContentText>

                            <TextField
                                id="video_descripcion"
                                name="video_descripcion"
                                label="Descripción *"
                                multiline
                                rows={5}
                                variant="standard"
                                fullWidth
                                value={form.video_descripcion}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={!!errors.video_descripcion}
                                helperText={errors.video_descripcion}
                            />

                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                id="video_link"
                                name="video_link"
                                label="Link"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={form.video_link}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={!!errors.video_link}
                                helperText={errors.video_link}
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                                <Box sx={{ width: '50%' }}>
                                    <InputLabel id="materia-label" sx={{ mt: 2 }}>
                                        Aula
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name="video_aula"
                                        value={form?.video_aula}
                                        label="Aula"
                                        onChange={handleChange}
                                        sx={{ width: '100%' }}
                                    >
                                        {sortedAulas?.map((aula) => (
                                            <MenuItem value={aula.aula_id} key={aula.aula_id}>{aula.aula_nombre}</MenuItem>
                                        ))}
                                    </Select>
                                </Box>

                                <Box sx={{ width: '50%' }}>
                                    <InputLabel id="materia-label" sx={{ mt: 2 }}>
                                        Materia
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name="video_materia"
                                        value={form?.video_materia}
                                        label="Materia"
                                        onChange={handleChange}
                                        sx={{ width: '100%' }}
                                    >
                                        {state.materias?.map((materia) => (
                                            <MenuItem value={materia.materia_id} key={materia.materia_id}>{materia.materia_nombre}</MenuItem>
                                        ))}
                                    </Select>
                                </Box>
                            </Box>


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
