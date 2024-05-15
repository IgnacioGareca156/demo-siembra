import React, { useContext, useEffect, useState } from 'react'
import { useMediaQuery, Paper, Box, TextField, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, TableSortLabel, TablePagination, Typography } from '@mui/material'
import { GlobalContext } from '../../services/global.context'
import EditarAlumno from './EditarAlumno'
import useFetch from '../../services/hooks/useFetch'
import EliminarAlumno from './EliminarAlumno'
import NuevoAlumno from './NuevoAlumno'

const TablaAlumnos = () => {
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [orderBy, setOrderBy] = useState('')
    const [order, setOrder] = useState('asc')
    const [search, setSearch] = useState('')
    const { state } = useContext(GlobalContext)
    const [profesor, setProfesor] = useState(state?.admin)
    const [rows, setRows] = useState([])
    const { get } = useFetch()

    useEffect(() => {
        get('Alumno', 'GET_ALUMNOS', { limit: 1000 })
        get('Aula', 'GET_AULAS', {})
    }, [])

    const columns = [
        { id: 'alumno_nombre', label: 'Nombre y Apellido', minWidth: 170 },
        { id: 'alumno_dni', label: 'DNI', minWidth: 100 },
        { id: 'alumno_aula', label: 'Aula', minWidth: 170, align: 'right' },
        { id: 'acciones', label: 'Acciones', minWidth: 170, align: 'right' },
    ]

    useEffect(() => {
        setTimeout(() => {
            setRows(
                state.alumnos?.map((alumno) => {
                    const aula = state?.aulas.find((aula) => aula.aula_id === alumno.alumno_aula)
                    return {
                        id: alumno.alumno_id,
                        alumno_nombre: `${alumno.alumno_nombre} ${alumno.alumno_apellido}`,
                        alumno_dni: alumno.alumno_dni,
                        alumno_aula: aula && aula.aula_nombre,
                    }
                })
            )
        }, 700);
    }, [state.alumnos])

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    const handleSort = (columnId) => {
        const isAsc = orderBy === columnId && order === 'asc'
        setOrderBy(columnId)
        setOrder(isAsc ? 'desc' : 'asc')
    }

    const sortedRows = () => {
        let filteredRows = rows
        if (search) {
            filteredRows = rows.filter((row) =>
                columns.some((column) => String(row[column.id]).toLowerCase().includes(search.toLowerCase()))
            )
        }
        if (orderBy && order) {
            return filteredRows.slice().sort((a, b) => {
                const itemA = a[orderBy]
                const itemB = b[orderBy]
                return order === 'asc' ? (itemA < itemB ? -1 : 1) : itemB < itemA ? -1 : 1
            })
        }
        return filteredRows
    }

    const searcher = (e) => {
        setSearch(e.target.value)
        setPage(0)
    }

    const isDesktop = useMediaQuery('(min-width:700px)')

    return isDesktop ? (
        // TABLA DESKTOP
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <Box sx={{ m: '12px', display: 'flex', justifyContent: 'space-between', flexDirection: { xs: 'column', sm: 'row' } }}>
                <Box sx={{display:'flex' , justifyContent: 'center', alignItems: 'center'}}>
                    <TextField id="search" label="Buscar" variant="outlined" onChange={searcher} value={search} autoComplete="off" sx={{ width: { xs: '100%', sm: 300, md: 300 }, mr: 2, mb: { xs: 2, sm: 0 } }} />
                    <Typography variant="body1" color="" sx={{color: '#929292'}}>Busqueda por Nombre, Dni o Aula (ejemplo: 3ro C)</Typography>
                </Box>
                <NuevoAlumno />
            </Box>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table" >
                    <TableHead>
                        <TableRow>
                            {columns?.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    <TableSortLabel
                                        active={orderBy === column.id}
                                        direction={orderBy === column.id ? order : 'asc'}
                                        onClick={() => handleSort(column.id)}
                                    >
                                        {column.label}
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedRows()
                            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            ?.map((row) => (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.id} >
                                    {columns?.map((column) => (
                                        <TableCell key={column.id} align={column.align} sx={{ padding: 2 }}>
                                            {(() => {
                                                if (column.id === 'acciones') {
                                                    if (profesor?.profesor_admin) {
                                                        return (
                                                            <>
                                                                <EditarAlumno alumno_id={row.id} aulas={state.aulas} />
                                                                <EliminarAlumno alumno_id={row.id} />
                                                            </>
                                                        )
                                                    } else {
                                                        return (
                                                            <EditarAlumno alumno_id={row.id} aulas={state.aulas} />
                                                        )
                                                    }
                                                } else {
                                                    return row[column.id]
                                                }
                                            })()}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={state.alumnos.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    ) : (
        // TABLA MOBILE
        <Paper sx={{ width: '100%', overflowX: 'auto' }}>
            <Box sx={{ m: '12px' }}>
                <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', flexDirection: { xs: 'column', sm: 'row' } }}>
                    <TextField id="search" label="Buscar" variant="outlined" onChange={searcher} value={search} autoComplete="off" sx={{ width: { xs: '100%', sm: 300, md: 300 }, mr: 2, mb: { xs: 2, sm: 0 } }} />
                    <NuevoAlumno />
                </Box>
                <TableContainer>
                    <Table aria-label="sticky table">
                        <TableBody>
                            {sortedRows()
                                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                ?.map((row, index) => (
                                    columns?.map((column) => (
                                        <TableRow role="checkbox" tabIndex={-1} key={`${row.id}-${column.id}`} sx={{ backgroundColor: `${index % 2 === 0 && '#f0efef'}`, width: '100%' }}>
                                            <TableCell
                                                key={column.id}
                                                align='left'
                                                sx={{ fontWeight: 500 }}
                                            >
                                                <TableSortLabel
                                                    active={orderBy === column.id}
                                                    direction={orderBy === column.id ? order : 'asc'}
                                                    onClick={() => handleSort(column.id)}
                                                >
                                                    {column.label}
                                                </TableSortLabel>
                                            </TableCell>

                                            {(() => {
                                                if (column.id === 'acciones') {
                                                    if (profesor?.profesor_admin) {
                                                        return (
                                                            <TableCell
                                                                align='right'
                                                            >
                                                                <EditarAlumno alumno_id={row.id} aulas={state.aulas} />
                                                                <EliminarAlumno alumno_id={row.id} />
                                                            </TableCell>
                                                        )
                                                    } else {
                                                        return (
                                                            <TableCell
                                                                align='right'
                                                            >
                                                                <EditarAlumno alumno_id={row.id} aulas={state.aulas} />
                                                            </TableCell>
                                                        )
                                                    }
                                                } else {
                                                    return <TableCell align='right'> {row[column.id]} </TableCell>
                                                }
                                            })()}
                                        </TableRow>
                                    ))
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={state.alumnos.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
                    labelRowsPerPage="Filas :"
                    sx={{ mb: '12px' }}
                />
            </Box>
        </Paper>
    )
}

export default TablaAlumnos
