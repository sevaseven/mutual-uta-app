import React from 'react'
import { Button, Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { validarSoloUnPermiso } from '../../../helpers/permisos';

const AddButtonAbm = ({ title, titleButton, form: Form, handleSave, permiso, sizeModal = "md", style={}, classes }) => {
    const { permisos:permisosUser } = useSelector(state => state.auth);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            {
                (permiso === null || validarSoloUnPermiso(permisosUser, permiso)) &&
                <>
                    <Button variant={"contained"} color="primary" onClick={handleClickOpen} style={style}>{titleButton ? titleButton : title}</Button>
                    {
                        open &&
                        <Dialog open={open} onClose={handleClose} fullWidth maxWidth={sizeModal}>
                            <DialogTitle className={classes ? classes.formTitle : {}}>{title || "Crear"}</DialogTitle>
                            <DialogContent>
                                <Form
                                    formData={null}
                                    handleSubmit={(data) => handleSave(data, handleClose)}
                                    handleCancel={handleClose}
                                    editable={true}
                                />
                            </DialogContent>
                        </Dialog>
                    }
                </>
            }
        </>
    )
}

export default AddButtonAbm