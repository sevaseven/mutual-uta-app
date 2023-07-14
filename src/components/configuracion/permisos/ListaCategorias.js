import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PageviewIcon from "@material-ui/icons/Pageview";
import { IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import FormCategoria from './FormCategoria';

const style = {
    table: {
        padding: 0,
        margin: 0,
        boxSizing: "border-box"
    },
    iconButton: {
        width: 32,
        height: 32,
        padding: 0,
        marginTop: 0,
        marginBottom: 0
    }
};

const ListaCategorias = (props) => {
    const [categoriaSelected, setCategoriaSelected] = useState(null)
    const {categorias} = useSelector(state => state.permisos)


    const handleCategoriaSelect = async (categoria) => {
        setCategoriaSelected(categoria);
    };

    return (
        <>
        {
            categoriaSelected === null 
            ?
        
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="left"></TableCell>
                        <TableCell align="left">ID</TableCell>
                        <TableCell align="left">Nombre</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {categorias.map((item) => (
                        <TableRow hover key={item.idCategoria}>
                            <TableCell align="left">
                                <IconButton style={style.table}
                                    onClick={(e) => handleCategoriaSelect(item)}
                                    color="primary"
                                    aria-label="seleccionar"
                                >
                                    <PageviewIcon style={style.iconButton} />
                                </IconButton>
                            </TableCell>
                            <TableCell align="left">
                                {item.idCategoria}
                            </TableCell>
                            <TableCell align="left">
                                {item.nombre}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>

            </Table>
            :
            <FormCategoria categoria={categoriaSelected} setOpen={props.setOpen} setCategoriaSelected={setCategoriaSelected}/>
            }
        </>
    );
}

export default ListaCategorias;
