import React, { useContext } from 'react'
import OndemandVideoSharpIcon from '@mui/icons-material/OndemandVideoSharp';
import BookSharpIcon from '@mui/icons-material/BookSharp';
import VideoCameraFrontSharpIcon from '@mui/icons-material/VideoCameraFrontSharp';
import BusinessCenterSharpIcon from '@mui/icons-material/BusinessCenterSharp';
import EmailSharpIcon from '@mui/icons-material/EmailSharp';
import MenuBookSharpIcon from '@mui/icons-material/MenuBookSharp';
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';
import {
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    ListItemIcon
  } from "@mui/material";
import { GlobalContext } from '../services/global.context';
import { Navigate, useNavigate } from 'react-router-dom';

const ListAlumno = () => {
    const navigate = useNavigate()
    const {dispatch} = useContext(GlobalContext)
    const handleLogut = () => {
        dispatch({type: 'LOGOUT_ALUMNO',dispatch: {}})
        return <Navigate to="/login/digital" />
    }
    return (
        <>
            <nav aria-label="main mailbox folders">
                <List>
                    <ListItem disablePadding sx={{ display: 'block' }} onClick={() => {navigate("/digital")}}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                <BookSharpIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Tareas'} sx={{ opacity: open ? 1 : 0 }}></ListItemText>
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                <OndemandVideoSharpIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Videos'} sx={{ opacity: open ? 1 : 0 }}></ListItemText>
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                <VideoCameraFrontSharpIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Video Conferencia'} sx={{ opacity: open ? 1 : 0 }}></ListItemText>
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                <BusinessCenterSharpIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Trabajos Práctico'} sx={{ opacity: open ? 1 : 0 }}></ListItemText>
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                <EmailSharpIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Notificación'} sx={{ opacity: open ? 1 : 0 }}></ListItemText>
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                <MenuBookSharpIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Librería'} sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider />
                <ListItem disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                        }}
                        onClick={handleLogut}
                    >
                        <LogoutSharpIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            <MenuBookSharpIcon />
                        </LogoutSharpIcon>
                        <ListItemText primary={'Salir'} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </ListItem>

            </nav>
        </>
    )
}

export default ListAlumno
