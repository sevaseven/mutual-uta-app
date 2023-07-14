import { Card, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageviewIcon from "@material-ui/icons/Pageview";
import { usuariosLimpiar, usuariosSeleccionar } from '../../../actions/usuarios/usuarios';

const style = {
    root:
    {
        width:700,
        margin:30,
        padding:20
    },
    table: {
        padding: 0, 
        margin:0, 
        boxSizing: "border-box"
    },
    iconButton: {
        width: 32,
        height: 32,
        padding: 0,
        marginTop:0,
        marginBottom:0
    }
};

const optionsfecha = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
};

export const ListaUsuarios = () => {

    const { items } = useSelector((state) => state.usuarios);
    const dispatch = useDispatch();
    
    const handleUserSelec = (user) => {
        dispatch( usuariosLimpiar() );

        dispatch( usuariosSeleccionar(user) );
    };

    return ( 
        <Grid container justify="center">
            <Card className={style.root}>  
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left"></TableCell>
                                <TableCell align="left">Usuario</TableCell>
                                <TableCell align="left">Nombre</TableCell>
                                <TableCell align="left">Email</TableCell>
                                <TableCell align="left">Fecha Alta</TableCell>
                                <TableCell align="left">Fecha Baja</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((user) => (
                                <TableRow key={user.idUsuario}>
                                    <TableCell align="left">
                                        <IconButton style={style.table}
                                            onClick={(e) => handleUserSelec(user)}
                                            color="primary"
                                            aria-label="seleccionar"
                                        >
                                            <PageviewIcon style={style.iconButton} />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell align="left">
                                        {user.userLogin}
                                    </TableCell>
                                    <TableCell align="left">
                                        {user.userName}
                                    </TableCell>
                                    <TableCell align="left">
                                        {user.email}
                                    </TableCell>
                                    <TableCell align="left">
                                        {new Date(user.fechaAlta).toLocaleString(
                                            "es",
                                            optionsfecha
                                        )}
                                    </TableCell>
                                    <TableCell align="left">
                                        {user.fechaBaja && 
                                            new Date(user.fechaBaja).toLocaleString(
                                                "es",
                                                optionsfecha
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </Grid>
     );
}
