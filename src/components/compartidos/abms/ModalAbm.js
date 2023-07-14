import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Dialog, Toolbar, Typography } from "@material-ui/core";

import { DialogTitle } from '@material-ui/core';


const useStyles = makeStyles({
    usuario: {
        textAlign: "center",
        float: "left"
    },
    botonera: {
        marginTop: 25,
        padding:25
    },
    header: {
        background: '#9C27B0',
        color: 'white'
    }
});


export const ModalAbm = (props) => {

    const classes = useStyles();
    const { open, title, children } = props

    const handleClose = () => {
        props.setOpen(false);
    };
    return (
        <Dialog
            maxWidth="md"
            fullWidth={true}
            open={open}
            onClose={handleClose}
            style={{overflowY:"auto"}}
        >
            <DialogTitle className={classes.header}>
                <Toolbar style={{justifyContent:"space-between"}}>
                    <Typography variant="h6" className={classes.title}>
                        {title}
                    </Typography>
                </Toolbar>
            </DialogTitle>
            {children}
        </Dialog>
    );

};

export default ModalAbm;