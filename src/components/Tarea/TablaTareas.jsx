import React, { useContext, useEffect, useState } from 'react'
import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, TextField, useMediaQuery } from '@mui/material'
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp'
import EditSharpIcon from '@mui/icons-material/EditSharp'
import RemoveRedEyeSharpIcon from '@mui/icons-material/RemoveRedEyeSharp'
import { GlobalContext } from '../../services/global.context'
import useFetch from '../../services/hooks/useFetch'
import EditarTarea from './EditarTarea'
import EliminarTarea from './EliminarTarea'
import NuevaTarea from './NuevaTarea'

const TablaTareas = () => {
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
        const isAdmin = state.admin?.profesor_admin
        
        get('Aula', 'GET_AULAS', {})
        get('Materia', 'GET_MATERIAS', {})
        if(isAdmin){
            get('Tarea', 'GET_TAREAS', {
                limit: -1,
                sort: ['sort', '-date_created'],
            })
        }else{
            get('Tarea', 'GET_TAREAS', {
                limit: -1,
                sort: ['sort', '-date_created'],
                filter:{
                    tarea_profesor: {
                        _eq: state.admin?.profesor_id,
                    }
                }
            })
        }
    }, [])

    const columns = [
        { id: 'tarea_id', label: 'Id', minWidth: 170 },
        { id: 'tarea_titulo', label: 'Título', minWidth: 170 },
        { id: 'tarea_descripcion', label: 'Descripción', minWidth: 170 },
        {
            id: 'tarea_materia',
            label: 'Materia',
            minWidth: 170,
            align: 'right',
        },
        {
            id: 'tarea_aula',
            label: 'Aula',
            minWidth: 170,
            align: 'right',
        },
        {
            id: 'date_created',
            label: 'Fecha de creación',
            minWidth: 170,
            align: 'right',
        },
        {
            id: 'acciones',
            label: 'Acciones',
            minWidth: 170,
            align: 'right',
        },
    ]


    useEffect(() => {
        // Actualizar las filas cada vez que hay cambios en alumnos o aulas
        setTimeout(() => {
            setRows(
                state.tareas?.map((tarea) => {
                    // Buscar el nombre del aula y materia correspondiente
                    const aula = state.aulas.find(aula => aula.aula_id === tarea.tarea_aula)
                    const materia = state.materias.find(materia => materia.materia_id === tarea.tarea_materia)

                    // Obtener día, mes y año
                    const fecha = new Date(tarea.date_created)
                    const dia = fecha.getDate()
                    const mes = fecha.getMonth() + 1 // Los meses son indexados desde 0
                    const año = fecha.getFullYear()

                    // Formatear la fecha en "dd-mm-yyyy"
                    const fechaFormateada = (dia < 10 ? '0' : '') + dia + '-' + (mes < 10 ? '0' : '') + mes + '-' + año

                    return {
                        tarea_id: tarea.tarea_id,
                        tarea_titulo: tarea.tarea_titulo,
                        tarea_descripcion: tarea.tarea_descripcion,
                        tarea_aula_id: tarea.tarea_aula?.aula_id,
                        tarea_materia_id: tarea.tarea_materia?.materia_id,
                        tarea_file: tarea.tarea_file,
                        tarea_aula: aula?.aula_nombre || '',
                        tarea_materia: materia?.materia_nombre || '',
                        materia_color: materia?.materia_color || '',
                        date_created: fechaFormateada
                    }
                })
            )
        }, 600);

    }, [state.tareas])


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
        // Variable para almacenar las filas filtradas
        let filteredRows = rows

        // Si hay un término de búsqueda, filtrar las filas
        if (search) {
            filteredRows = rows.filter((row) =>
                // Comprobar si algún valor en alguna de las columnas coincide con el término de búsqueda
                columns.some((column) =>
                    String(row[column.id]).toLowerCase().includes(search.toLowerCase())
                )
            )
        }

        // Si hay una columna por la cual ordenar y una dirección de ordenamiento,
        // ordenar las filas, de lo contrario, devolver las filas filtradas
        if (orderBy && order) {
            return filteredRows.slice().sort((a, b) => {
                const itemA = a[orderBy]
                const itemB = b[orderBy]

                // Comparar los valores y determinar la dirección de ordenamiento
                if (order === 'asc') {
                    return itemA < itemB ? -1 : 1
                } else {
                    return itemB < itemA ? -1 : 1
                }
            })
        }

        // Si no hay una columna por la cual ordenar, devolver las filas filtradas
        return filteredRows
    }

    const searcher = (e) => {
        setSearch(e.target.value)
        setPage(0)
    }

    const isDesktop = useMediaQuery('(min-width:900px)')
    return isDesktop ? (
        // TABLA DESKTOP
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <Box sx={{ m: '12px', display: 'flex', justifyContent: 'space-between', flexDirection: { xs: 'column', sm: 'row' } }}>
                <TextField id="search" label="Buscar" variant="outlined" onChange={searcher} value={search} autoComplete="off" sx={{ width: { xs: '100%', sm: 300, md: 300 }, mr: 2, mb: { xs: 2, sm: 0 } }} />
                <NuevaTarea />
            </Box>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
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
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.tarea_id} >
                                    {columns?.map((column) => (
                                        
                                        <TableCell key={`${column.id}${row.tarea_id}`} align={column.align} sx={{ padding: 2, backgroundColor: row.materia_color }}>
                                            {(() => {
                                                // console.log(row)
                                                if (column.id === 'acciones') {
                                                    if (profesor?.profesor_admin) {
                                                        // Si el profesor es administrador, renderizar ambos botones
                                                        return (
                                                            <>
                                                                <EditarTarea tarea_id={row.tarea_id} aulas={state?.aulas} materias={state?.materias} />
                                                                <EliminarTarea tarea_id={row.tarea_id} tarea_file={row.tarea_file} />
                                                                <IconButton component={'a'} color='' aria-label='Ver Cartilla' size='large' target="_blank" href={`https://xer.pascalito.com.ar/assets/${row.tarea_file}`}>
                                                                    <RemoveRedEyeSharpIcon />
                                                                </IconButton>
                                                            </>
                                                        )
                                                    } else {
                                                        // Si el profesor no es administrador, renderizar solo el botón editar
                                                        return (
                                                            <>
                                                                <EditarTarea id={row.tarea_id} aulas={state.aulas} materias={state.materias} />
                                                                <IconButton component={'a'} color='' aria-label='Ver Cartilla' size='large' target="_blank" href={`https://xer.pascalito.com.ar/assets/${row.tarea_file}`}>
                                                                    <RemoveRedEyeSharpIcon />
                                                                </IconButton>
                                                            </>
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
                count={state.tareas.length}
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
                    <NuevaTarea />
                </Box>
                <TableContainer>
                    <Table aria-label="sticky table">
                        <TableBody>
                            {sortedRows()
                                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                ?.map((row, index) => (
                                    columns?.map((column) => (
                                        <TableRow role="checkbox" tabIndex={-1} key={`${row.id}-${column.id}`} sx={{ backgroundColor: `${row.materia_color || index % 2 === 0 && '#c2c2c2'}`, width: '100%'}}>
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
                                                                <EditarTarea tarea_id={row.tarea_id} aulas={state?.aulas} materias={state?.materias} />
                                                                <EliminarTarea tarea_id={row.tarea_id} tarea_file={row.tarea_file} />
                                                                <IconButton component={'a'} color='' aria-label='Ver Cartilla' size='large' target="_blank" href={`https://xer.pascalito.com.ar/assets/${row.tarea_file}`}>
                                                                    <RemoveRedEyeSharpIcon />
                                                                </IconButton>
                                                            </TableCell>
                                                        )
                                                    } else {
                                                        return (
                                                            <TableCell
                                                                align='right'
                                                            >
                                                                <EditarTarea id={row.tarea_id} aulas={state.aulas} materias={state.materias} />
                                                                <IconButton component={'a'} color='' aria-label='Ver Cartilla' size='large' target="_blank" href={`https://xer.pascalito.com.ar/assets/${row.tarea_file}`}>
                                                                    <RemoveRedEyeSharpIcon />
                                                                </IconButton>

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
                    count={state.tareas.length}
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

export default TablaTareas
