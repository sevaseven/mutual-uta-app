import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../../hooks/useForm';
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from '@material-ui/icons/Cancel';
import LoopIcon from '@material-ui/icons/Loop';
import { Imagen } from './Imagen';
import { Roles } from './Roles';
import { Button, Grid, makeStyles, TextField, FormControl, InputLabel, Select, MenuItem, Switch, Typography } from '@material-ui/core';
import { startUserBaja, startUserPasswordReset, startUserUpdate, startUserUpdateEstado } from '../../../actions/usuarios/usuarios';
import { fetchRolesUsuario } from '../../../actions/usuarios/roles';
import { traerSeccionales } from '../../../actions/cbos/seccionales';
import {
    ValidatorForm,
    TextValidator,
    SelectValidator
} from "react-material-ui-form-validator";
import ReactSelect from "react-select";

const rolRecetas = parseInt(process.env.REACT_APP_ROL_RECETAS);

const useStyles = makeStyles((theme) => ({
    usuario: {
        textAlign: "center",
        backgroundColor: theme.palette.background.paper,
    },
    botonera: {
        marginTop: 25,
        marginLeft: 55,
        paddingBottom: 13
    },
    roles: {
        float: "left",
        marginLeft: 15,
    },
    formControl: {
        marginTop: 15,
        width: 183,
        textAlign: "left"
    },
    switchBase: {
        color: '#bdbdbd',
        '&$checked': {
            transform: 'translateX(16px)',
            color: '#4CAF50',
            '& + $track': {
                backgroundColor: '#3E8040',
                opacity: 1,
                border: 'none',
            },
        },
    },
    checked: {},
    track: {},
    rootObs: {
        display: "flex",
        flexWrap: "wrap",
        "& > *": {
            margin: theme.spacing(1),
            width: theme.spacing(16),
            height: theme.spacing(16),
        },
    },
    container: {
        width: "80vw",
    },
    texto: {
        padding: 2,
        // marginLeft: 20,
        marginTop: 4,
        width: '89%',
    },
    divContenedor: {
        display: "flex",
        justifyContent: "space-between",
    },
}));

const optionsfecha = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
};

export const Usuario = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { usuarioSeleccionado } = useSelector((state) => state.usuarios);
    const { rolesUsuarioSeleccionado } = useSelector((state) => state.roles);
    const { items: itemsSeccionales } = useSelector((state) => state.seccionales);
    const [formValues, handleInputChange, , setearValor] = useForm(usuarioSeleccionado);
    const { idUsuario, userLogin, userName, dni, email, fechaAlta, fechaBaja, idSeccional, estado,
        observacion, cambioPassword, matriculaNac, matriculaProv, especialidadesUsuarios } = formValues;
    

    const handleSave = () => {
        dispatch(startUserUpdate({
            idUsuario, userName, dni, userLogin, email, idSeccional, observacion, cambioPassword,
            matriculaNac, matriculaProv, especialidadesUsuarios, idProvinciaCSF
        }));
    }

    const eventMulti = (e) => {
        setearValor(
            "especialidadesUsuarios",
            e.map((e) => e.value)
        );
    };

    const handleResetPassword = () => {
        dispatch(startUserPasswordReset(idUsuario))
    }

    const handleBaja = () => {
        dispatch(startUserBaja(idUsuario))
    }

    const handleChangeEstado = e => {
        dispatch(startUserUpdateEstado(idUsuario, e.target.checked));
    }

    useEffect(() => {
        dispatch(traerSeccionales());
        dispatch(fetchRolesUsuario(idUsuario));
    }, [dispatch, idUsuario])

    return (
        <>
            {usuarioSeleccionado && (
                <ValidatorForm onSubmit={handleSave}>
                    <Grid container justify="center" spacing={1}>
                        <Grid item xs={12} md={9} >
                            <Grid container justify="center" spacing={3}>
                                <Grid item md={9} >
                                    <Grid container justify="center" spacing={3}>
                                        <Grid item md={12} >
                                            <div className={classes.usuario}>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={12} md={4} >
                                                        <TextValidator
                                                            margin="normal"
                                                            label="Nombre y Apellido"
                                                            name="userName"
                                                            value={userName}
                                                            autoComplete="off"
                                                            onChange={handleInputChange}
                                                            inputProps={{ maxLength: 50 }}
                                                            validators={["required"]}
                                                            errorMessages={["Este campo es obligatorio"]}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} md={4} >
                                                        <TextValidator
                                                            margin="normal"
                                                            label="Usuario"
                                                            name="userLogin"
                                                            value={userLogin}
                                                            autoComplete="off"
                                                            onChange={handleInputChange}
                                                            inputProps={{ maxLength: 50, style: { textTransform: "uppercase" } }}
                                                            validators={["required"]}
                                                            errorMessages={["Este campo es obligatorio"]}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} md={4} >
                                                        <TextValidator
                                                            margin="normal"
                                                            label="Email"
                                                            name="email"
                                                            value={email}
                                                            autoComplete="off"
                                                            onChange={handleInputChange}
                                                            inputProps={{ maxLength: 50 }}
                                                            validators={['required', 'isEmail']}
                                                            errorMessages={['Este campo es obligatorio', 'El email no es valido']}
                                                        />
                                                    </Grid>
                                                </Grid>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={12} md={4} >
                                                        <TextField
                                                            margin="normal"
                                                            disabled={true}
                                                            label="Fecha Alta"
                                                            name="fechaAlta"
                                                            value={new Date(fechaAlta).toLocaleString(
                                                                "es",
                                                                optionsfecha
                                                            )}
                                                            autoComplete="off"
                                                            onChange={handleInputChange}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} md={4} >
                                                        <TextField
                                                            margin="normal"
                                                            disabled={true}
                                                            label="Fecha Baja"
                                                            name="fechaBaja"
                                                            value={fechaBaja &&
                                                                new Date(fechaBaja).toLocaleString(
                                                                    "es",
                                                                    optionsfecha
                                                                )}
                                                            autoComplete="off"
                                                            onChange={handleInputChange}
                                                            InputLabelProps={{ shrink: true }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} md={4} >
                                                        <FormControl className={classes.formControl}>
                                                            <InputLabel id="select-seccional-label" >Seccional</InputLabel>
                                                            <Select
                                                                labelId="select-seccional-label"
                                                                id="select-seccional"
                                                                name="idSeccional"
                                                                value={idSeccional}
                                                                onChange={handleInputChange}
                                                            >
                                                                {itemsSeccionales.map((t) => (
                                                                    <MenuItem key={t.id_seccional} value={t.id_seccional}>
                                                                        {t.descripcion_seccional.substr(0, 18)}
                                                                    </MenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                </Grid>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={12} md={4} >
                                                        <TextValidator
                                                            margin="normal"
                                                            label="DNI"
                                                            name="dni"
                                                            value={dni}
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
                                                    <Grid item xs={12} md={4} >
                                                        <Grid container item direction="row" lg={12} style={{ marginTop: 25 }}>
                                                            <Grid container item direction="row" alignItems="center" justify="center">
                                                                <Grid item lg={3} sm={3} style={{ marginLeft: 20 }}>
                                                                    <Switch
                                                                        checked={estado}
                                                                        name={estado}
                                                                        onChange={handleChangeEstado}
                                                                        classes={{ switchBase: classes.switchBase, checked: classes.checked, track: classes.track }}
                                                                    />
                                                                </Grid>
                                                                <Grid item lg={9} sm={9} style={{ marginLeft: -35 }}>
                                                                    <Typography >{'Activo / Inactivo'}</Typography>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={12} md={4} >
                                                    </Grid>
                                                </Grid>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={12} md={8} >
                                                        <TextField
                                                            className={classes.texto}
                                                            name="observacion"
                                                            value={observacion}
                                                            label="Observaciones"
                                                            placeholder="Ingrese obsevaciones"
                                                            fullWidth
                                                            multiline
                                                            rows={7}
                                                            rowsMax={8}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                            onChange={handleInputChange}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={4} style={{ marginTop: 10/* , marginLeft: 88 */ }}>
                                                        <Imagen />
                                                    </Grid>
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
                                                                type="submit"
                                                                startIcon={<SaveIcon />}
                                                            >
                                                                GUARDAR
                                                            </Button>
                                                            {
                                                                estado &&
                                                                <Button
                                                                    variant="contained"
                                                                    color="default"
                                                                    size="small"
                                                                    startIcon={<LoopIcon />}
                                                                    onClick={handleResetPassword}
                                                                >
                                                                    RESTABLECER PASSWORD
                                                                </Button>
                                                            }

                                                            <Button
                                                                variant="contained"
                                                                color="secondary"
                                                                size="small"
                                                                startIcon={<CancelIcon />}
                                                                onClick={handleBaja}
                                                            >
                                                                BAJA USUARIO
                                                            </Button>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item md={3} >
                                    <Grid container justify="center" spacing={3}>
                                        <Grid item md={12} >
                                            <Areas />
                                        </Grid>
                                        <Grid item md={12} >
                                            <Roles />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </ValidatorForm>
            )}
        </>
    );
}