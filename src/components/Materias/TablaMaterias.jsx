import React, { useContext, useEffect, useState } from 'react';
import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, TextField } from '@mui/material';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import RemoveRedEyeSharpIcon from '@mui/icons-material/RemoveRedEyeSharp';
import { GlobalContext } from '../../services/global.context';
import useFetch from '../../services/hooks/useFetch';
import EditarMateria from './EditarMateria';
import EliminarMateria from './EliminarMateria';
import NuevoMateria from './NuevaMateria';
import { colores } from './colores';

const TablaAulas = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [orderBy, setOrderBy] = useState('');
    const [order, setOrder] = useState('asc');
    const [search, setSearch] = useState('');
    const { state } = useContext(GlobalContext);
    const [profesor, setProfesor] = useState(state?.admin);
    const [rows, setRows] = useState([]);

    const {get} = useFetch()
    
    useEffect(() => {
        get('Materia','GET_MATERIAS',{})
    },[])

    const columns = [
        { id: 'materia_nombre', label: 'Materia', minWidth: 170 },
        {
            id: 'acciones',
            label: 'Acciones',
            minWidth: 170,
            align: 'right',
        },
    ];

    useEffect(() => {
        // Actualizar las filas cada vez que hay cambios en alumnos o materias
        setTimeout(() => {
            setRows(
                state.materias?.map((materia) => {
                    // Buscar el nombre del materia y materia correspondiente
                    
                    return {
                        materia_id: materia.materia_id,
                        materia_nombre: materia.materia_nombre,
                        materia_color: materia.materia_color
                    };
                })
            );
        }, 700);

    }, [state.materias]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleSort = (columnId) => {
        const isAsc = orderBy === columnId && order === 'asc';
        setOrderBy(columnId);
        setOrder(isAsc ? 'desc' : 'asc');
    };

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
        setSearch(e.target.value);
        setPage(0)
    };

  return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <Box sx={{ m: '12px', display: 'flex', justifyContent: 'space-between', flexDirection:{xs:'column',sm:'row'} }}>
                <TextField id="search" label="Buscar" variant="outlined" onChange={searcher} value={search} autoComplete="off" sx={{width:{xs:'100%',sm:300,md:300},mr:2,mb:{xs:2,sm:0} }} />
                <NuevoMateria/>
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
                            ?.map((row,index) => (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.materia_id} sx={{backgroundColor: {xs: `${index % 2 === 0 && '#f0efef'}`,md: '#ffffff'}}}>
                                    {columns?.map((column) => (
                                        <TableCell key={`${column.id}${row.materia_id}`} align={column.align} sx={{backgroundColor: row.materia_color}} >
                                            {(() => {
                                                if (column.id === 'acciones') {
                                                    return (
                                                        <>
                                                            <EditarMateria materia_id={row.materia_id} />
                                                            <EliminarMateria materia_id={row.materia_id} />
                                                        </>
                                                    );
                                                } else {
                                                    return row[column.id];
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
                count={state.materias?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

export default TablaAulas
