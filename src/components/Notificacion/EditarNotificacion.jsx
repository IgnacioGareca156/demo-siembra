import React, { useContext, useEffect, useRef, useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { InputLabel, MenuItem, Select, Box, IconButton, CircularProgress } from '@mui/material'
import useFetch from '../../services/hooks/useFetch'
import useForm from '../../services/hooks/useForm'
import { directus } from '../../services/directus'
import { updateFile } from '@directus/sdk'
import EditSharpIcon from '@mui/icons-material/EditSharp';
import { GlobalContext } from '../../services/global.context'

export default function EditarNotificacion({ noti_id, aulas }) {
    const [open, setOpen] = useState(false)
    const sortedAulas = aulas?.sort((a, b) => a.aula_nombre.localeCompare(b.aula_nombre))
    const [selectedFile, setSelectedFile] = useState(null)
    const { state } = useContext(GlobalContext)
    const { getById, update } = useFetch()
    const [successMessage, setSuccessMessage] = useState('')

    const validate = (form) => {
        let errors = {}
        // Puedes agregar validaciones si es necesario
        return errors
    }

    // Para manejar el cambio en la selección del archivo
    const handleFileChange = (event) => {
        const file = event.target.files[0]
        setSelectedFile(file)
    }

    const enviarArchivo = async () => {
        if(selectedFile){
            try {
                // Crea un objeto FormData y agrega el archivo a él
                const formData = new FormData()
                formData.append('folder', '6b453a6d-4ca1-424a-b38e-7c7d11992d02')
                formData.append('storage', 'local')
                formData.append('filename_download', selectedFile.name)
                formData.append('title', form.noti_titulo)
                formData.append('type', selectedFile.type)
                formData.append('file', selectedFile)
    
                // Sube el archivo a Directus
                const response = await directus.request(updateFile(form.noti_file, formData))
    
                // Obtiene el ID del archivo desde la respuesta y lo asigna al formulario para la cartilla
                form.noti_file = response.id
            } catch (error) {
                console.log(error)
            } finally {
                setSelectedFile(null)
            }
        }
    }

    const enviarDatos = async () => {
        try {
            await enviarArchivo()

            // Realiza la solicitud UPDATE con el formulario actualizado
            await update(noti_id, form, 'Notificacion', 'UPDATE_NOTI', {})
            setSuccessMessage('¡Operación Existosa!')

        } catch (error) {
            console.log('Error en la consulta', error)
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
        noti_titulo: '',
        noti_file: '',
        noti_aula: '',
    }, enviarDatos)

    const handleClickOpen = () => {
        setOpen(true)

        // solicitud para obtener los datos de la tarea con el ID tarea_id
        getById(noti_id, 'Notificacion', 'GET_NOTI', {})

    }

    const handleClose = () => {
        setOpen(false)
        setSuccessMessage(''); // Limpiar mensaje de éxito

    }


    useEffect(() => {
        setForm({
            noti_titulo: state.getNoti?.noti_titulo || '',
            // tarea_descripcion: state.getTarea?.tarea_descripcion || '',
            noti_file: state.getNoti?.noti_file || '',
            noti_aula: state.getNoti?.noti_aula || '',
            // tarea_materia: state.getTarea?.tarea_materia || '',
        })
    }, [state.getNoti])

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

                <DialogTitle>Editar Notificacion</DialogTitle>
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
                                Edite la información de la Notificacion
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
                                {sortedAulas?.map((aula) => (
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
                                    <Button onClick={handleClose}>Cancelar</Button>
                                    <Button type="submit">Guardar Cambios</Button>
                                </>
                            )}
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </React.Fragment>
    )
}
