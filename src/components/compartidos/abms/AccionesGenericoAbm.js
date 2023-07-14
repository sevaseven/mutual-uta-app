import { IconButton, makeStyles } from '@material-ui/core'
import React from 'react'
import PageviewIcon from "@material-ui/icons/Pageview";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { validarSoloUnPermiso } from '../../../helpers/permisos';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
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
}));

const AccionesGenericoAbm = ({ item, handleItemSelect, permisoDelete, handleDelete, showSelect = true, showDelete = true }) => {
    const { permisos: permisosUser } = useSelector(state => state.auth)
    const classes = useStyles()
    return (
        <>
        {
            (showSelect) && <IconButton
            className={classes.table}
            onClick={(e) => handleItemSelect(item)}
            color="primary"
            aria-label="seleccionar"
        >
            <PageviewIcon className={classes.iconButton} />
        </IconButton>
        }
            
            {
                validarSoloUnPermiso(permisosUser, permisoDelete) && (showDelete) &&
                <IconButton
                    className={classes.table}
                    aria-label="Eliminar"
                    onClick={() => handleDelete(item)}
                >
                    <DeleteForeverIcon className={classes.iconButton} />
                </IconButton>
            }
        </>
    )
}

export default AccionesGenericoAbm
