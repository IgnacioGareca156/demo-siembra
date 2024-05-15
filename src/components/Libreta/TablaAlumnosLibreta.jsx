import React, { useContext, useEffect, useState } from 'react'
import { useMediaQuery, Paper, Box, TextField, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, TableSortLabel, TablePagination, Typography, Grid } from '@mui/material'
import useFetch from '../../services/hooks/useFetch'
import { GlobalContext } from '../../services/global.context'


const TablaLibretaAlumnos = ({ aula }) => {
    const [search, setSearch] = useState('')
    const { state } = useContext(GlobalContext)
    const { get } = useFetch()
    console.log(state.materias)
    useEffect(() => {
        get('Alumno', 'GET_ALUMNOS', {
            sort: ['sort', 'alumno_apellido'],
            filter: {
                alumno_aula: {
                    _eq: aula
                }
            },

        })
    }, [aula])

    const columns = [
        { id: ['alumno_apellido', 'alumno_nombre'], label: 'Nombre y Apellido', minWidth: 170 },
        // { id: 'alumno_nombre', label: 'Nombre', minWidth: 170 },
        // { id: 'alumno_dni', label: 'DNI', minWidth: 100 },
        // { id: 'acciones', label: 'Acciones', minWidth: 170, align: 'right' },
    ]

    const sortedRows = () => {
        let filteredRows = state.alumnos
        if (search) {
            filteredRows = state.alumnos.filter((alumno) =>
                columns.some((column) => String(alumno[column.id]).toLowerCase().includes(search.toLowerCase()))
            )
        }

        return filteredRows
    }

    const searcher = (e) => {
        setSearch(e.target.value)
    }

    const isDesktop = useMediaQuery('(min-width:700px)')

    return isDesktop ? (
        // TABLA DESKTOP
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <Box sx={{ m: '12px', display: 'flex', justifyContent: 'space-between', flexDirection: { xs: 'column', sm: 'row' } }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <TextField id="search" label="Buscar" variant="outlined" onChange={searcher} value={search} autoComplete="off" sx={{ width: { xs: '100%', sm: 300, md: 300 }, mr: 2, mb: { xs: 2, sm: 0 } }} />
                    <Typography variant="body1" color="" sx={{ color: '#929292' }}>Busqueda por Nombre, Dni o Aula (ejemplo: 3ro C)</Typography>
                </Box>
            </Box>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table" >
                    <TableHead>
                        <TableRow>
                            {columns?.map((column) => ( //map para la columna de nombre y apellido
                                <TableCell
                                    key={column.id[0]}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >

                                    {column.label}

                                </TableCell>
                            ))}

                            {state.materias.map(materia => ( //map para las columnas de materias
                                <TableCell
                                    key={materia.id}
                                    align={'center'}
                                >

                                    {materia.materia_nombre}

                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedRows().map((row) => (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.alumno_id} >
                                {columns?.map((column) => (
                                    <TableCell key={column.id} align={column.align} sx={{ padding: 2 }}>
                                        {`${row[column.id[0]]} ${row[column.id[1]]}`}

                                    </TableCell>
                                ))}

                                {state.materias.map(materia => ( //map para las notas
                                    <TableCell key={materia.id} align={'center'} sx={{ padding: 2 }}>
                                        {/* Buscar la nota correspondiente a la materia y al alumno */}
                                        {Math.floor(Math.random() * 10) + 1}
                                    </TableCell>
                                ))}
                            </TableRow>

                        ))}


                    </TableBody>
                </Table>
            </TableContainer>

        </Paper>

    ) : (
        // TABLA MOBILE
        // <Paper sx={{ width: '100%', overflowX: 'auto' }}>
        //     <Box sx={{ m: '12px' }}>
        //         <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', flexDirection: { xs: 'column', sm: 'row' } }}>
        //             <TextField id="search" label="Buscar" variant="outlined" onChange={searcher} value={search} autoComplete="off" sx={{ width: { xs: '100%', sm: 300, md: 300 }, mr: 2, mb: { xs: 2, sm: 0 } }} />
        //             <NuevoAlumno />
        //         </Box>
        //         <TableContainer>
        //             <Table aria-label="sticky table">
        //                 <TableBody>
        //                     {sortedRows()
        //                         ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        //                         ?.map((row, index) => (
        //                             columns?.map((column) => (
        //                                 <TableRow role="checkbox" tabIndex={-1} key={`${row.id}-${column.id}`} sx={{ backgroundColor: `${index % 2 === 0 && '#f0efef'}`, width: '100%' }}>
        //                                     <TableCell
        //                                         key={column.id}
        //                                         align='left'
        //                                         sx={{ fontWeight: 500 }}
        //                                     >
        //                                         <TableSortLabel
        //                                             active={orderBy === column.id}
        //                                             direction={orderBy === column.id ? order : 'asc'}
        //                                             onClick={() => handleSort(column.id)}
        //                                         >
        //                                             {column.label}
        //                                         </TableSortLabel>
        //                                     </TableCell>

        //                                     {(() => {
        //                                         if (column.id === 'acciones') {
        //                                             if (profesor?.profesor_admin) {
        //                                                 return (
        //                                                     <TableCell
        //                                                         align='right'
        //                                                     >
        //                                                         <EditarAlumno alumno_id={row.id} aulas={state.aulas} />
        //                                                         <EliminarAlumno alumno_id={row.id} />
        //                                                     </TableCell>
        //                                                 )
        //                                             } else {
        //                                                 return (
        //                                                     <TableCell
        //                                                         align='right'
        //                                                     >
        //                                                         <EditarAlumno alumno_id={row.id} aulas={state.aulas} />
        //                                                     </TableCell>
        //                                                 )
        //                                             }
        //                                         } else {
        //                                             return <TableCell align='right'> {row[column.id]} </TableCell>
        //                                         }
        //                                     })()}
        //                                 </TableRow>
        //                             ))
        //                         ))}
        //                 </TableBody>
        //             </Table>
        //         </TableContainer>
        //         <TablePagination
        //             rowsPerPageOptions={[10, 25, 100]}
        //             component="div"
        //             count={state.alumnos.length}
        //             rowsPerPage={rowsPerPage}
        //             page={page}
        //             onPageChange={handleChangePage}
        //             onRowsPerPageChange={handleChangeRowsPerPage}
        //             labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
        //             labelRowsPerPage="Filas :"
        //             sx={{ mb: '12px' }}
        //         />
        //     </Box>
        // </Paper>
        <></>
    )
}

export default TablaLibretaAlumnos
