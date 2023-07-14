import { List, makeStyles } from '@material-ui/core';
import { Home, CalendarToday, Person } from '@material-ui/icons';
import React from 'react'
import ItemMenuIzquierda from './ItemMenuIzquierda';

const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    nestedLevel2: {
      paddingLeft: theme.spacing(2),
    },
  }));

const MenuIzquierdaAfiliado = ({ cerrarMenuIzquierda }) => {
    const classes = useStyles();

    return (
        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            className={classes.root}
        >
            <ItemMenuIzquierda icon={Home} nombre="Inicio" ruta="/afiliado/inicio" cerrarMenuIzquierda={cerrarMenuIzquierda}  />
            <ItemMenuIzquierda icon={Person} nombre="Mi perfil" ruta="/afiliado/mi-perfil" cerrarMenuIzquierda={cerrarMenuIzquierda}  />
            <ItemMenuIzquierda icon={CalendarToday} nombre="Mi turnos" ruta="/afiliado/inicio" cerrarMenuIzquierda={cerrarMenuIzquierda}  />

        </List>
    )
}

export default MenuIzquierdaAfiliado
