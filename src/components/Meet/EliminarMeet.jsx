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

const EliminarMeet = ({ meet_id }) => {
    const { eliminar } = useFetch()
    const [open, setOpen] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const eliminarMeet = async () => {
        try {
            setLoading(true)
            // Elimina El alumno por su id
            await eliminar(meet_id, 'Meet', 'DELETE_MEET', {})
            setSuccessMessage('¡Operación Existosa!')

        } catch (error) {
            console.error('Error en la consulta', error)
        } finally {
            setLoading(false)
            setTimeout(() => {
                if(successMessage !== ''){
                    handleClose(); // Cerrar el diálogo después de 2 segundos
                }
            }, 4000);
        }
    }

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleCloseEliminar = async () => {
        await eliminarMeet()
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
                    {"Eliminar Clase Virtual"}
                </DialogTitle>
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
                                ¿Realmente desea eliminar esta Clase Virtual?
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

export default EliminarMeet
