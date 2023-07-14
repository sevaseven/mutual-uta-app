import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { useSelector } from 'react-redux';
import { validarSoloUnPermiso } from '../../../helpers/permisos';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

const DeleteButtonAbm = ({ permiso, handleDelete, mensajeEliminacion, motivo, setMotivo, validators, errorMessages, Component}) => {
    const { permisos:permisosUser } = useSelector(state => state.auth)
    const [openDelete, setOpenDelete] = React.useState(false)

    const handleClickOpenDelete = () => {
        setOpenDelete(true);
    };

    const handleCloseDelete = () => {
        setOpenDelete(false);
        if(motivo?.active)
        setMotivo({
            ...motivo,
            text: ""
        })
    };

    const handleContinuarDelete = () => {
        handleCloseDelete()
        handleDelete()
    }

    return (
        <>
            {
                (permiso === null || validarSoloUnPermiso(permisosUser, permiso)) &&
                <>
                    {!Component ? (
                        <IconButton
                            aria-label="Eliminar"
                            onClick={() => handleClickOpenDelete()}
                        >
                            <DeleteForeverIcon sx={{ fontSize: "2rem" }} />
                        </IconButton>
                        ) : (
                            <Component handleClick={handleClickOpenDelete} />
                        )
                    }
                    {openDelete && 
                        <Dialog 
                            fullWidth
                            maxWidth="sm"
                            open={openDelete} 
                            onClose={handleCloseDelete} 
                        >
                            <DialogTitle>Eliminar</DialogTitle>
                            <DialogContent>
                                <DialogContentText style={motivo?.active ? null : {textAlign: "center", fontSize: "1.5em", fontWeight: "lighter"}}>
                                    {mensajeEliminacion || "¿Estás seguro que deseas eliminar este item?"}
                                </DialogContentText>
                                {motivo?.active &&
                                    <ValidatorForm
                                        onSubmit={handleContinuarDelete}
                                        style={{ flexGrow: "1" }}
                                    >
                                        <TextValidator
                                            multiline
                                            rows={2}
                                            fullWidth
                                            variant="outlined"
                                            margin="normal"
                                            label="Motivo de baja"
                                            name="motivo"
                                            value={motivo.text}
                                            onChange={e => setMotivo({
                                                ...motivo,
                                                text: e.target.value
                                            })}
                                            InputLabelProps={{ style: { fontWeight: 'bold' } }}
                                            validators={validators}
                                            errorMessages={errorMessages}
                                        />
                                    </ValidatorForm>
                                } 
                            </DialogContent>
                            <DialogActions>
                                <Button color='secondary' type={motivo?.active ? "submit" : "button"} onClick={handleCloseDelete}>Cancelar</Button>
                                <Button onClick={handleContinuarDelete}>Continuar</Button>
                            </DialogActions>
                        </Dialog>
                    }
                </>
            }
        </>
    )
}

export default DeleteButtonAbm