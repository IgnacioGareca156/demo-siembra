import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import { Box } from '@mui/material'
import Footer from '../components/Footer'

const Layout = () => {
  return (
    <Box>

        <Header></Header>
        <Box component="main" sx={{ 
          flexGrow: 1, 
          pt:5, 
          textAlign: 'justify', 
          p:{xs:2,sm:2,md:3,lg:5,xl:7},
          alignContent: 'center'
          }}
        >
          <Outlet/>
        </Box>
        {/* <Footer></Footer> */}
    </Box>
    
  )
}

export default Layout
