import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { Button, Dialog, Grid, TextField, Toolbar, Typography } from "@material-ui/core";
import { addUser } from "../../../actions/usuarios/usuarios";
// import { Imagen } from "./Imagen";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from '@material-ui/icons/Cancel';
import { DialogTitle } from '@material-ui/core';
import {
    ValidatorForm,
    TextValidator,
  } from "react-material-ui-form-validator";

const useStyles = makeStyles({
    root:{
        marginLeft: "auto",
        marginRight: "auto",
        display: "table",
        height: 300,
    },
    header:{
        background: '#68389F',
        color:'white'
      },
    input: {
        width: 245
    },
    botonera: {
        marginTop: 25,
        marginLeft: 55,
        paddingBottom: 13
    },
});

const optionsfecha = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };


export const ModalAlta = (props) => {
  
    const classes = useStyles();
    const dispatch = useDispatch();
    const [userNuevo,setUser] = useState({
        userName:'',
        userLogin:'',
        dni:'',
        email:'',
        urlImagen:''
    });

    const handleSave = () => {
        dispatch( addUser(userNuevo, closeModal) );
    }
    const closeModal = () => {
        props.setOpen(false);
        setUser({userName:'', userLogin:'', dni:'', email:'', urlImagen:''});
    }
    const handleInputChange = (e) => {
        setUser({...userNuevo,[e.target.name]:e.target.value});
    }
    
    return (
        <Dialog
            maxWidth="md"
            fullWidth={true}
            open={props.open}
            onClose={closeModal}
        >
            <DialogTitle className={classes.header}>
                <Toolbar >
                    <Typography variant="h6" >
                    Alta Nuevo Usuario
                    </Typography>
                </Toolbar>
            </DialogTitle>
            <ValidatorForm onSubmit={handleSave}>
                <div className={classes.root}>
                    <Grid container spacing={4}>
                        <Grid item xs={4} >
                            <TextValidator
                                className={classes.input}
                                margin="normal"
                                label="Nombre y Apellido"
                                name="userName"
                                value={userNuevo.userName}
                                autoComplete="off"
                                onChange={handleInputChange}
                                inputProps={{ maxLength: 50 }}
                                validators={["required"]}
                                errorMessages={["Este campo es obligatorio"]}
                            />
                        </Grid>
                        <Grid item xs={4} >
                            <TextValidator
                                className={classes.input}
                                margin="normal"
                                label="Usuario"
                                name="userLogin"
                                type="text"
                                value={userNuevo.userLogin}
                                autoComplete="off"
                                onChange={handleInputChange}
                                inputProps={{ maxLength: 50, style: { textTransform: "uppercase" }}}
                                validators={["required"]}
                                errorMessages={["Este campo es obligatorio"]}
                            />
                        </Grid>
                        <Grid item xs={4} >
                            <TextValidator
                                className={classes.input}
                                margin="normal"
                                label="Email"
                                name="email"
                                value={userNuevo.email}
                                autoComplete="off"
                                onChange={handleInputChange}
                                inputProps={{ maxLength: 50 }}
                                validators={['required', 'isEmail']}
                                errorMessages={['Este campo es obligatorio', 'El email no es valido']}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid item xs={4} >
                            <TextValidator
                                className={classes.input}
                                margin="normal"
                                label="DNI"
                                name="dni"
                                value={userNuevo.dni}
                                autoComplete="off"
                                onChange={handleInputChange}
                                validators={["required", "isNumber", "minNumber:999999", "maxNumber:99999999"]}
                                errorMessages={[
                                    "Este campo es obligatorio",
                                    "solo numeros",
                                    "Verifique su dni",
                                    "Verifique su dni"
                                ]}
                            />
                        </Grid>
                        <Grid item xs={4} >
                            <TextField
                                
                                margin="normal"
                                disabled={true}
                                label="Fecha Alta"
                                name="fechaAlta"
                                value={new Date().toLocaleString(
                                    "es",
                                    optionsfecha
                            )}
                            autoComplete="off"
                            onChange={handleInputChange}
                        />
                        </Grid>
                        {/* <Grid item xs={4} style={{marginTop: 10}}>
                            <Imagen id='idModal'/>
                        </Grid> */}
                    </Grid>
                        
                    <Grid className={classes.botonera} container spacing={3}>
                        <Grid item xs={10}>
                            <Grid
                                container
                                spacing={1}
                                direction="row"
                                justify="space-between"
                                alignItems="center"
                            >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    startIcon={<SaveIcon />}
                                    type="submit"
                                >
                                    GUARDAR
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    size="small"
                                    startIcon={<CancelIcon />}
                                    onClick={closeModal}
                                >
                                    CANCELAR
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </ValidatorForm>
        </Dialog>
    );

};
