import React, { useContext } from 'react'
import OndemandVideoSharpIcon from '@mui/icons-material/OndemandVideoSharp';
import BookSharpIcon from '@mui/icons-material/BookSharp';
import VideoCameraFrontSharpIcon from '@mui/icons-material/VideoCameraFrontSharp';
import BusinessCenterSharpIcon from '@mui/icons-material/BusinessCenterSharp';
import EmailSharpIcon from '@mui/icons-material/EmailSharp';
import MenuBookSharpIcon from '@mui/icons-material/MenuBookSharp';
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import PasswordSharpIcon from '@mui/icons-material/PasswordSharp';
import PeopleAltSharpIcon from '@mui/icons-material/PeopleAltSharp';
import SchoolSharpIcon from '@mui/icons-material/SchoolSharp';
import AccountBalanceSharpIcon from '@mui/icons-material/AccountBalanceSharp';
import BorderColorSharpIcon from '@mui/icons-material/BorderColorSharp';
import DescriptionSharpIcon from '@mui/icons-material/DescriptionSharp';
import {
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    ListItemIcon,
    Typography
} from "@mui/material";
import { GlobalContext } from '../services/global.context';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Fade from '@mui/material/Fade';


const ListAdmin = ({ onClick }) => {
    const navigate = useNavigate()
    const { state, dispatch } = useContext(GlobalContext)
    const [expanded, setExpanded] = React.useState(false);

    const handleExpansion = () => {
        setExpanded((prevExpanded) => !prevExpanded);
    };


    const handleLogut = () => {
        dispatch({ type: 'LOGOUT', dispatch: null })
        return <Navigate to={"/"} />
    }

    return (
        <>
            <nav aria-label="main mailbox folders">

                <Typography sx={{ position: 'absolute', top: '23px', fontSize: '25px', fontWeight: 'bold', width: '100%', textAlign: 'center', cursor: 'pointer' }} onClick={() => { navigate("/"); onClick() }}>
                    Pascalito Digital
                </Typography>


                <List>
                    {(state.admin && state.admin.profesor_admin) && ( //solo se renderizan estos elementos del menu si el profesor es administrador
                        <Accordion
                            expanded={expanded}
                            onChange={handleExpansion}
                            slotProps={{ transition: { timeout: 400 } }}
                            sx={{
                                '& .MuiAccordion-region': { height: expanded ? 'auto' : 0 },
                                '& .MuiAccordionDetails-root': { display: expanded ? 'block' : 'none' },
                            }}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <Typography>Organización</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <>
                                    {/* ALUMNOS */}
                                    <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate("/panel/alumnos"); onClick() }}>
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
                                                <SchoolSharpIcon />
                                            </ListItemIcon>
                                            <ListItemText primary={'Alumnos'} sx={{ opacity: open ? 1 : 0 }}></ListItemText>
                                        </ListItemButton>
                                    </ListItem>
                                    {/* PROFESOR */}
                                    <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate("/panel/profesor"); onClick() }}>
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
                                                <PeopleAltSharpIcon />
                                            </ListItemIcon>
                                            <ListItemText primary={'Profesores'} sx={{ opacity: open ? 1 : 0 }}></ListItemText>
                                        </ListItemButton>
                                    </ListItem>
                                    {/* AULAS */}
                                    <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate("/panel/aulas"); onClick() }} >
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
                                                <AccountBalanceSharpIcon />
                                            </ListItemIcon>
                                            <ListItemText primary={'Aulas'} sx={{ opacity: open ? 1 : 0 }}></ListItemText>
                                        </ListItemButton>
                                    </ListItem>
                                    {/* MATERIAS */}
                                    <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate("/panel/materias"); onClick() }} >
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
                                            <ListItemText primary={'Materias'} sx={{ opacity: open ? 1 : 0 }}></ListItemText>
                                        </ListItemButton>
                                    </ListItem>

                                </>
                            </AccordionDetails>
                        </Accordion>
                    )}
                    {/*  MEET DOCENTES / REUNIONES */}
                    <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate("/panel/meet_profesor"); onClick() }}>
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
                            <ListItemText primary={'Meet'} sx={{ opacity: open ? 1 : 0 }}></ListItemText>
                        </ListItemButton>
                    </ListItem>

                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2-content"
                            id="panel2-header"
                        >
                            <Typography>Documentos</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {/* NOTIFICACIONES */}
                            <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate("/panel/notificaciones"); onClick() }}>
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
                                    <ListItemText primary={'Notificaciones'} sx={{ opacity: open ? 1 : 0 }}></ListItemText>
                                </ListItemButton>
                            </ListItem>
                            {/* TRABAJOS PRACTICOS */}
                            <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate("/panel/tps"); onClick() }}>
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
                                    <ListItemText primary={'Trabajos Prácticos'} sx={{ opacity: open ? 1 : 0 }}></ListItemText>
                                </ListItemButton>
                            </ListItem>
                            {/* TAREAS */}
                            <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate("/panel/tareas"); onClick() }}>
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
                                        <BorderColorSharpIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={'Tareas'} sx={{ opacity: open ? 1 : 0 }}></ListItemText>
                                </ListItemButton>
                            </ListItem>
                            {/* CARTILLA */}
                            <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate("/panel/cartilla"); onClick() }}>
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
                                        <DescriptionSharpIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={'Cartilla'} sx={{ opacity: open ? 1 : 0 }}></ListItemText>
                                </ListItemButton>
                            </ListItem>
                            {/* BIBLIOTECA */}
                            <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate("/panel/biblioteca"); onClick() }}>
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
                                    <ListItemText primary={'Biblioteca'} sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel3-content"
                            id="panel3-header"
                        >
                            <Typography>Recursos</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {/* VIDEO */}
                            <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate("/panel/video"); onClick() }}>
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
                            {/*  VIDEO CONFERENCIA / CLASES VIRTUALES */}
                            <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate("/panel/video_conferencia"); onClick() }}>
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
                                    <ListItemText primary={'Clases Virtuales'} sx={{ opacity: open ? 1 : 0 }}></ListItemText>
                                </ListItemButton>
                            </ListItem>
                        </AccordionDetails>
                    </Accordion>
                </List>


                {/* CAMBIAR CONTRASEÑA */}
                <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate("/panel/password"); onClick() }}>
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
                            <PasswordSharpIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Cambiar Contraseña'} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </ListItem>
                {/* SALIR */}
                <ListItem disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                        }}
                        onClick={handleLogut}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            <LogoutSharpIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Salir'} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </ListItem>

            </nav>
        </>
    )
}

export default ListAdmin
