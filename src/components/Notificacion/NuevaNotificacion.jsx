import React, { useContext, useEffect, useRef, useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { InputLabel, MenuItem, Select, Box, CircularProgress } from '@mui/material';
import { directus } from './../../services/directus'
import { uploadFiles } from '@directus/sdk'
import useFetch from '../../services/hooks/useFetch';
import useForm from '../../services/hooks/useForm';
import { GlobalContext } from '../../services/global.context';


export default function NuevaNotificacion() {

    const [open, setOpen] = React.useState(false);
    const { state } = useContext(GlobalContext)
    const { post, get, loading } = useFetch()
    const sortedAulas = state.aulas?.sort((a, b) => a.aula_nombre.localeCompare(b.aula_nombre))
    const [selectedFile, setSelectedFile] = useState(null)
    const [successMessage, setSuccessMessage] = useState('')


    useEffect(() => {
        get('Aula', 'GET_AULAS', {})
        // get('Materia','GET_MATERIAS',{})
    }, [])

    const initialForm = {
        noti_titulo: '',
        noti_file: null,
        noti_aula: '',
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

    //para manejar el cambio en la selección del archivo
    const handleFileChange = (event) => {
        const file = event.target.files[0]
        setSelectedFile(file)
    }

    const enviarArchivo = async () => {
        try {
            // Crea un objeto FormData y agrega el archivo a él
            const formData = new FormData()
            formData.append('folder', '6b453a6d-4ca1-424a-b38e-7c7d11992d02')
            formData.append('storage', 'local')
            formData.append('filename_download', selectedFile.name)
            formData.append('title', form.noti_titulo) //el titulo debe ser el titulo del formulario o el titulo del archivo??
            formData.append('type', selectedFile.type)
            formData.append('file', selectedFile)

            // Sube el archivo a Directus
            const response = await directus.request(uploadFiles(formData))

            // Obtiene el ID del archivo desde la respuesta y lo asigna al formulario para la Tarea
            form.noti_file = response.id

        } catch (error) {
            console.log(error)
        } finally {
            setSelectedFile(null)
        }
    }

    const enviarDatos = async () => {

        try {
            await enviarArchivo() //invoca a la funcion que carga el archivo

            // Realiza la solicitud POST con el formulario actualizado
            await post(form, 'Notificacion', 'POST_NOTI', {})
            setSuccessMessage('¡Operación Existosa!')

        } catch (error) {
            console.log('Error en la consulta', error)
        } finally {
            setForm(initialForm)
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
                Nueva Notificación
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: handleSubmit
                }}
            >
                <DialogTitle>Nueva Notificación</DialogTitle>
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
                                Registre una nueva Notificación
                            </DialogContentText>
                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                id="noti_titulo"
                                name="noti_titulo"
                                label="Titulo"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={form.noti_titulo}
                                onChange={handleChange}
                            />

                            <TextField
                                required
                                margin="dense"
                                id="noti_file"
                                name="noti_file"
                                label="Archivo"
                                type="file"
                                fullWidth
                                variant="standard"
                                onChange={handleFileChange}
                            />
                            <InputLabel id="materia-label" sx={{ mt: 2 }}>
                                Aula
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="noti_aula"
                                value={form.noti_aula}
                                label="Aula"
                                onChange={handleChange}
                                sx={{ width: '100%' }}
                            >
                                {state.aulas?.map((aula) => (
                                    <MenuItem value={aula.aula_id} key={aula.aula_id}>{aula.aula_nombre}</MenuItem>
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
}