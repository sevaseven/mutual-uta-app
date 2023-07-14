import React, {  useState } from "react";
import { useDispatch } from "react-redux";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Paper,
    Box,
    Grid,
    Typography,
    Card,
} from "@material-ui/core";
import { useStylesAuth } from "../../styles/auth/style";
import { CopyRight } from "../ui/CopyRight";
import { useForm } from "../../hooks/useForm";
import { useHistory, useParams } from "react-router";
import { startAlerta } from "../../actions/ui/alertas";
import logo from '../../assets/LOGOS_RGB-02.png'
import AfiliadoService from '../../services/AfiliadoService'

export const RestaurarPasswordScreen = () => {
    const history = useHistory()
    const classes = useStylesAuth();
    const {token} = useParams();

    const [errorValidacionPassword, setErrorValidacionPassword] = useState(false);
    const [errorValidacionConfirm, setErrorValidacionConfirm] = useState(false);
    const [verFormulario, setVerFormulario] = useState(false)

    const initialState = {
        password: "",
        confirmPassword: ""
    };
    const [formValues, handleInputChange, reset] = useForm(initialState);

    const { password, confirmPassword } = formValues;

    const dispatch = useDispatch();

    const inputChange = (e) => {
        handleInputChange(e);
        //VALIDO CONTENIDO
        if (e.target.name === "password") {
            if (e.target.value === "") {
                setErrorValidacionPassword(true);
            } else {
                setErrorValidacionPassword(false);
            }
        }
        if (e.target.name === "confirmPassword") {
            if (e.target.value === "") {
                setErrorValidacionConfirm(true);
            } else {
                setErrorValidacionConfirm(false);
            }
        }

    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        let error = false;
        setErrorValidacionPassword(false);
        setErrorValidacionConfirm(false);
        if (password.length === 0) {
            error = true;
            setErrorValidacionPassword(true);
        }

        if (confirmPassword !== password) {
            error = true;
            setErrorValidacionConfirm(true);
        }

        if (!error) {
            try {
                const data={
                    newPassword: password,
                    token
                }
                const result=await AfiliadoService.resetPassword(data)
                const body=await result.json()
                if(result.ok){
                    reset(initialState)
                    dispatch(startAlerta("¡Contraseña actualizada exitosamente!", "success"))
                    history.push("/auth/login-afiliado")
                }else{
                    throw body.errores
                }
            } catch (error) {
                if(error.mensaje){
                    dispatch(startAlerta(error.mensaje, "error"))
                }else{
                    dispatch(startAlerta("Ha ocurrido un error en el cambio de contraseña. Intente nuevamente.", "error"))
                }
                console.log("Error en el cambio de contraseña del usuario", error)
            }
        }
    };

    if (!verFormulario && (navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i))) {
        return (
            <Grid container>
                <Grid item xs={12} md={6} style={{ marginLeft: "auto", marginRight: "auto", padding: "1rem" }} component={Card} elevation={6}>
                    <img src={logo} style={{ marginLeft: "auto", marginRight: "auto", marginBottom: "1rem", width: "100%" }}></img>

                    <Typography align="center">Hemos detectado que estas intentando cambiar tu contraseña desde tu dispositivo móvil.</Typography>
                    <Typography align="center">¿Deseas continuar por la app o por la web?</Typography>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{ marginTop: "2rem" }}
                        component="a"
                        href={`ospedyc://password-reset/${token}`}//URL de la app
                    >
                        Continuar por la app
                        </Button>
                    <Button
                        fullWidth
                        variant="outlined"
                        color="primary"
                        style={{ marginTop: "0.5rem" }}

                        onClick={() => setVerFormulario(true)}
                    >
                        Continuar por la Web
                        </Button>
                </Grid>
            </Grid>
        )
    }

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={6} md={7} className={classes.image} />
            <Grid item xs={12} sm={6} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">Nueva contraseña</Typography>
                    <Typography variant="body2" align="justify" style={{ marginTop: "1rem" }}>A continuación, ingrese su nueva contraseña para poder actualizarla.</Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            id="password"
                            variant="outlined"
                            margin="normal"
                            error={errorValidacionPassword}
                            helperText={errorValidacionPassword && "Ingrese contraseña"}
                            required={true}
                            fullWidth
                            label="Contraseña"
                            name="password"
                            value={password}
                            autoComplete="off"
                            autoFocus
                            onChange={inputChange}
                            type="password"
                        />

                        <TextField
                            id="confirmPassword"
                            variant="outlined"
                            margin="normal"
                            error={errorValidacionConfirm}
                            helperText={errorValidacionConfirm && "Las contraseñas deben ser iguales"}
                            required={true}
                            fullWidth
                            label="Confirmación de contraseña"
                            name="confirmPassword"
                            value={confirmPassword}
                            autoComplete="off"
                            autoFocus
                            onChange={inputChange}
                            type="password"
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={handleChangePassword}
                        >
                            Actualizar Contraseña
                        </Button>


                        <Box mt={5}>
                            <CopyRight />
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
};
