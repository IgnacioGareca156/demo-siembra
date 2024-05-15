import React, { useContext, useState } from 'react'
import LockResetSharpIcon from '@mui/icons-material/LockResetSharp';
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';
import useFetch from '../../services/hooks/useFetch';
import { GlobalContext } from '../../services/global.context';

const ResetPassword = ({ profesor_id }) => {
    const { state } = useContext(GlobalContext)
    const { update, getById } = useFetch()
    const [open, setOpen] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const newPassword = 'pascalito2024'

    const reset = async () => {
        try {
            setLoading(true)
            // Elimina El profesor por su id
            await update(profesor_id, { ...state.getProfesor, profesor_password: newPassword }, 'Profesor', 'UPDATE_PROFESOR', {})
            setSuccessMessage('¡Operación Existosa!')
        } catch (error) {
            console.error('Error en la consulta', error)
        } finally {
            setLoading(false)
            setTimeout(() => {
                if (successMessage !== '') {
                    handleClose(); // Cerrar el diálogo después de 2 segundos
                }
            }, 4000);
        }
    }

    const handleClickOpen = () => {
        getById(profesor_id, 'Profesor', 'GET_PROFESOR', {})
        setOpen(true)
    }

    const handleCloseEliminar = async () => {
        await reset()
    }
    const handleClose = () => {
        setOpen(false)
        setSuccessMessage(''); // Limpiar mensaje de éxito

    }

    return (
        <>
            <IconButton color="" size="large" onClick={handleClickOpen}>
                <LockResetSharpIcon />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Resetear Contraseña"}
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
                                ¿Realmente desea resetear la contraseña de este usuario?
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

export default ResetPassword
