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

export default function NuevoMeet() {

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
        meet_descripcion: '',
        meet_link: '',
        meet_aula: '',
        meet_materia: '',
        meet_profesor: state.admin?.profesor_id,
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
            await post(form, 'Meet', 'POST_MEET', {})
            setSuccessMessage('¡Operación Existosa!')

        } catch (e) {
            console.error('Error en la consulta', error)
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
                Nueva Clase Virtual
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: handleSubmit
                }}
            >
                <DialogTitle>Nueva Clase Virtual</DialogTitle>
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
                                Registre una Clase Virtual
                            </DialogContentText>

                            <TextField
                                id="meet_descripcion"
                                name="meet_descripcion"
                                label="Descripción *"
                                multiline
                                rows={5}
                                variant="standard"
                                fullWidth
                                value={form.meet_descripcion}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={!!errors.meet_descripcion}
                                helperText={errors.meet_descripcion}
                            />

                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                id="meet_link"
                                name="meet_link"
                                label="Link"
                                type="url"
                                fullWidth
                                variant="standard"
                                value={form.meet_link}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={!!errors.meet_link}
                                helperText={errors.meet_link}
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                                <Box sx={{ width: '50%' }}>
                                    <InputLabel id="materia-label" sx={{ mt: 2 }}>
                                        Aula
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name="meet_aula"
                                        value={form?.meet_aula}
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
                                        name="meet_materia"
                                        value={form?.meet_materia}
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