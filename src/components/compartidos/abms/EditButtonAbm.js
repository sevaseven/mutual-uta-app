import React from 'react'
import { Dialog, DialogContent, DialogTitle, IconButton } from '@material-ui/core';
import PageviewIcon from '@material-ui/icons/Pageview';
import { useSelector } from 'react-redux';
import { validarSoloUnPermiso } from '../../../helpers/permisos';

const EditButtonAbm = ({ title, form: Form, item, handleSave, permiso, sizeModal = "md" }) => {
    const { permisos: permisosUser } = useSelector(state => state.auth)
    const [open, setOpen] = React.useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <IconButton
                aria-label="Editar"
                onClick={() => handleClickOpen()}
            >
                <PageviewIcon sx={{ fontSize: "2rem" }} color="primary" />
            </IconButton>
            {
                open &&
                <Dialog open={open} onClose={handleClose} fullWidth maxWidth={sizeModal}>
                    <DialogTitle>{title || "Editar"}</DialogTitle>
                    <DialogContent>
                        <Form
                            formData={item}
                            handleSubmit={(data) => handleSave(data, handleClose)}
                            handleCancel={handleClose}
                            editable={(permiso === null || validarSoloUnPermiso(permisosUser, permiso))}
                        />
                    </DialogContent>
                </Dialog>
            }
        </>
    )
}

export default EditButtonAbm