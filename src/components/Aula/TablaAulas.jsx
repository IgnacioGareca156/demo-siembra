import React, { useContext, useEffect, useState } from 'react';
import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, TextField } from '@mui/material';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import RemoveRedEyeSharpIcon from '@mui/icons-material/RemoveRedEyeSharp';
import { GlobalContext } from '../../services/global.context';
import useFetch from '../../services/hooks/useFetch';
import EditarAula from './EditarAula';
import EliminarAula from './EliminarAula';
import NuevoAula from './NuevoAula';


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
        get('Aula','GET_AULAS',{
            sort:['sort','aula_nombre']
        })
    },[])

    const columns = [
        { id: 'aula_nombre', label: 'Aula', minWidth: 170 },
        {
            id: 'acciones',
            label: 'Acciones',
            minWidth: 170,
            align: 'right',
        },
    ];

    useEffect(() => {
        // Actualizar las filas cada vez que hay cambios en alumnos o aulas
        setTimeout(() => {
            setRows(
                state.aulas?.map((aula) => {
                    // Buscar el nombre del aula y aula correspondiente
                    
                    return {
                        aula_id: aula.aula_id,
                        aula_nombre: aula.aula_nombre, 
                    };
                })
            );
            
        }, 700);

    }, [state.aulas]);

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
                <TextField id="search" label="Buscar" variant="outlined" onChange={searcher} value={search} autoComplete="off" sx={{width:{xs:'100%',sm:300,md:300},mr:2,mb:{xs:2,sm:0} }}/>
                <NuevoAula/>
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
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.aula_id} sx={{backgroundColor: {xs: `${index % 2 === 0 && '#f0efef'}`,md: '#ffffff'}}}>
                                    {columns?.map((column) => (
                                        <TableCell key={`${column.id}${row.aula_id}`} align={column.align} sx={{ padding: 2 }}>
                                            {(() => {
                                                if (column.id === 'acciones') {
                                                    return (
                                                        <>
                                                            <EditarAula aula_id={row.aula_id} />
                                                            <EliminarAula aula_id={row.aula_id} />
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
                    count={state.aulas.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
                    labelRowsPerPage="Filas :"
                    sx={{ mb: '12px' }}
                />
        </Paper>
    );
}

export default TablaAulas
