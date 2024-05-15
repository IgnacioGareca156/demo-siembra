import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import useMediaQuery from '@mui/material/useMediaQuery'
import React, { useState } from 'react'
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp'
import useFetch from '../../services/hooks/useFetch'
import { CircularProgress, IconButton } from '@mui/material'
import { directus } from '../../services/directus'
import { deleteFile } from '@directus/sdk'

const EliminarNotificacion = ({ noti_id,noti_file }) => {
    const { eliminar } = useFetch()
    const [open, setOpen] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const eliminarArchivo = async () => {
        try {
            await directus.request(deleteFile(noti_file))
        } catch (error) {
            console.log(error)
        }
    }

    const eliminarNoti = async () => {
        try {
            setLoading(true)
            // Elimina la Cartilla por su id
            await eliminar(noti_id,'Notificacion','DELETE_NOTI',{})
            await eliminarArchivo()
            setSuccessMessage('¡Operación Existosa!')

            
        } catch (error) {
            console.error('Error en la consulta', error)
        } finally {
            setLoading(false)
            setTimeout(() => {
                if(successMessage !== ''){ //solamente cierra el mensaje una vez que succesMessage este vacío para evitar que se cierre otro dialog
                    handleClose(); // Cerrar el diálogo después de 2 segundos
                }
            }, 4000);
        }
    }

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleCloseEliminar = async () => {
        await eliminarNoti()
    }
    const handleClose = () => {
        setOpen(false)
        setSuccessMessage(''); // Limpiar mensaje de éxito
    }

    return (
        <>
            <IconButton color="" size="large" onClick={handleClickOpen}>
                <DeleteSharpIcon />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Eliminar Notificación"}
                </DialogTitle>
                {successMessage ? (
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
                                ¿Realmente desea eliminar esta Notificación?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            {loading ? (
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                                    <CircularProgress />
                                </div>
                            ) : (
                                <>
                                    <Button onClick={handleClose} autoFocus>
                                        Cancelar
                                    </Button>
                                    <Button autoFocus onClick={handleCloseEliminar}>
                                        Confirmar
                                    </Button>
                                </>
                            )}
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </>
    )
}

export default EliminarNotificacion

