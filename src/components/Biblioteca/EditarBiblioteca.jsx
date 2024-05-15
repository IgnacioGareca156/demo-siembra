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

export default function EditarBiblioteca({ biblio_id, aulas, materias }) {
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
                formData.append('folder', 'd2c80a9c-d047-4ec2-be94-7b806bf7b0d8')
                formData.append('storage', 'local')
                formData.append('filename_download', selectedFile?.name)
                formData.append('title', form.biblio_titulo)
                formData.append('type', selectedFile?.type)
                formData.append('file', selectedFile)
    
                // Sube el archivo a Directus
                const response = await directus.request(updateFile(form.biblio_file, formData))
    
                // Obtiene el ID del archivo desde la respuesta y lo asigna al formulario para la cartilla
                form.biblio_file = response.id
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
            await update(biblio_id, form, 'Biblioteca', 'UPDATE_BIBLIOTECA', {})
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
        biblio_titulo: '',
        biblio_descripcion: '',
        biblio_file: '',
        biblio_aula: '',
        biblio_materia: '',
    }, enviarDatos)

    const handleClickOpen = () => {
        setOpen(true)

        //solicitud para obtener los datos de la tarea con el ID tarea_id
        getById(biblio_id, 'Biblioteca', 'GET_BIBLIOTECA', {})

    }

    const handleClose = () => {
        setOpen(false)
        setSuccessMessage(''); // Limpiar mensaje de éxito
    }


    useEffect(() => {
        setForm({
            biblio_titulo: state.getBiblioteca?.biblio_titulo || '',
            biblio_descripcion: state.getBiblioteca?.biblio_descripcion || '',
            biblio_file: state.getBiblioteca?.biblio_file || '',
            biblio_aula: state.getBiblioteca?.biblio_aula || '',
            biblio_materia: state.getBiblioteca?.biblio_materia || '',
        })
    }, [state.getBiblioteca])

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
                <DialogTitle>Editar Archivo</DialogTitle>
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
                                Edite la información del Archivo
                            </DialogContentText>
                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                id="biblio_titulo"
                                name="biblio_titulo"
                                label="Titulo"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={form.biblio_titulo}
                                onChange={handleChange}
                            />

                            <TextField
                                id="biblio_descripcion"
                                name="biblio_descripcion"
                                label="Descripción *"
                                multiline
                                rows={5}
                                variant="standard"
                                fullWidth
                                value={form.biblio_descripcion}
                                onChange={handleChange}
                            />

                            <TextField
                                margin="dense"
                                id="biblio_file"
                                name="biblio_file"
                                label="Archivo"
                                type="file"
                                fullWidth
                                variant="standard"
                                onChange={handleFileChange}
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                                <Box sx={{ width: '50%' }}>
                                    <InputLabel id="materia-label" sx={{ mt: 2 }}>
                                        Aula
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name="biblio_aula"
                                        value={form?.biblio_aula}
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
                                        name="biblio_materia"
                                        value={form.biblio_materia}
                                        label="Materia"
                                        onChange={handleChange}
                                        sx={{ width: '100%' }}
                                    >

                                        {materias?.map((materia) => (
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
