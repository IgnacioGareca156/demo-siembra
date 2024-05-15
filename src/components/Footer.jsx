import { Container, Link, Typography,Box } from '@mui/material'
import React from 'react'
// import { makeStyles } from '@material-ui/core/styles';


// const useStyles = makeStyles((theme) => ({
//     footer: {
//       backgroundColor: theme.palette.primary.main,
//       color: theme.palette.primary.contrastText,
//       padding: theme.spacing(3, 2),
//       textAlign: 'center',
//       position: 'fixed',
//       bottom: 0,
//       width: '100%',
//     },
//   }));
  
  const Footer = () => {
  
        return (
            <Box
            sx={{
                color: 'black',
                background: '#39C7F4',
                textAlign: 'center',
                width: '100%',
                position: 'fixed',
                left: 0,
                bottom: 0,
                zIndex: 1000,
              }}
            >
              <Container>
                <Typography variant="body1">
                  Todos los derechos reservados Blaise Pascal
                </Typography>
                <Typography variant="body2">
                  Desarrollado por {' '}
                  <Link color="inherit" href="https://tuweb.com/">
                    Xerex
                  </Link>{' '}
                </Typography>
                <Typography variant="body2">
                  Otro contenido aquí...
                </Typography>
              </Container>
            </Box>
          );
        };

export default Footer
