import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { validarQueTengaAunqueSeaUnSoloPermiso } from '../../helpers/permisos'

const ItemMenuIzquierda = ({ href, ruta, icon: Icon, nombre, permisos, cerrarMenuIzquierda, className, onClick = () => {} }) => {
    const { permisos: permisosUser } = useSelector(state => state.auth)

    if (permisos) {
        if (validarQueTengaAunqueSeaUnSoloPermiso(permisosUser, [permisos])) {
            return (
                <ListItem
                    component={Link}
                    onClick={cerrarMenuIzquierda}
                    button
                    to={ruta}
                    className={className ? className : ""}
                >
                    <ListItemIcon onClick={onClick}>
                        <Icon />
                    </ListItemIcon>
                    <ListItemText primary={nombre} onClick={onClick} />
                </ListItem>
            )
        }
    } else {
        return <ListItem
            component={Link}
            onClick={cerrarMenuIzquierda}
            button
            to={ruta}
            className={className ? className : ""}
        >
            <ListItemIcon onClick={onClick}>
                <Icon />
            </ListItemIcon>
            <ListItemText primary={nombre} onClick={onClick} />
        </ListItem>
    }


    return <></>

}

export default ItemMenuIzquierda
