import {
  Grid,
  makeStyles,
  Typography,
  Paper,
  Button,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { startAlerta } from "../../actions/ui/alertas";
import { startUserUpdatePassword } from "../../actions/usuarios/usuarios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(2),
  },
  rootDatos: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    padding: 10,
    marginTop: 20,
  },
  button: {
    marginTop: theme.spacing(2),
    float: "right",
  },
  input: {
    display: "none",
  },
}));

const CambioContraseñaUsuario = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const idUsuario = useSelector((state) => state.auth.idUsuario);
  const [showPasswordActual, setShowPasswordActual] = useState(false);
  const [showPasswordNueva, setShowPasswordNueva] = useState(false);
  const [showPasswordNuevaRepetir, setShowPasswordNuevaRepetir] =
    useState(false);

  const [contraseñaActual, setContraseñaActual] = useState("");
  const [contraseñaNueva, setContraseñaNueva] = useState("");
  const [contraseñaNuevaRepetir, setContraseñaNuevaRepetir] = useState("");

  const [mensajeErrorContraseñaActual, setMensajeErrorContraseñaActual] =
    useState("");
  const [mensajeErrorContraseñaNueva, setMensajeErrorContraseñaNueva] =
    useState("");
  const [
    mensajeErrorContraseñaNuevaRepetir,
    setMensajeErrorContraseñaNuevaRepetir,
  ] = useState("");

  const handleClickShowPassword = (showpassword, setearShowPassword) =>
    setearShowPassword(!showpassword);
  const handleMouseDownPassword = (showpassword, setearShowPassword) =>
    setearShowPassword(!showpassword);

  const validarContraseña = (contraseña, setearMensajeError) => {
    const regxp = /^([a-zA-Z0-9_-]){1,16}$/;
    if (contraseña.length > 8 || contraseña.length < 6) {
      setearMensajeError("La contraseña debe tener entre 6 y 8 caracteres");
    } else if (!regxp.test(contraseña)) {
      setearMensajeError("La contraseña debe ser alfanumerica");
    } else {
      setearMensajeError("");
    }
  };

  const validarContraseñaIguales = (
    contraseñaNueva,
    contraseñaReingreso,
    setearMensajeError
  ) => {
    if (contraseñaNueva !== contraseñaReingreso) {
      setearMensajeError(
        "La contraseña debe ser igual a la ingresada previamente"
      );
    } else {
      setearMensajeError("");
    }
  };

  const onClickCancelarHandler = () => {
    history.push("/");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      contraseñaActual.length === 0 ||
      contraseñaNueva === 0 ||
      contraseñaNuevaRepetir === 0
    ) {
      dispatch(
        startAlerta("Debe completar todos los campos.", "warning", `¡Error!`)
      );
      return;
    }

    if (
      mensajeErrorContraseñaActual.length !== 0 ||
      mensajeErrorContraseñaNueva.length !== 0 ||
      mensajeErrorContraseñaNuevaRepetir.length !== 0
    ) {
      dispatch(
        startAlerta("Debe corregir los campos con error.", "warning", `¡Error!`)
      );
      return;
    }

    dispatch(
      startUserUpdatePassword(
        idUsuario,
        contraseñaActual,
        contraseñaNueva,
        contraseñaNuevaRepetir,
        onClickCancelarHandler
      )
    );
  };

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={1}
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          <Typography
            variant="h5"
            style={{
              margin: "2rem 0",
              fontStyle: "italic",
              textAlign: "center",
              color: "white",
            }}
          >
            Cambio de Contraseña
          </Typography>
        </Grid>
        <Grid item xs={1} sm={2} lg={4}/>
        <Grid item xs={8} sm={8} lg={4}>
          <Paper
            component="form"
            style={{
              padding: "2px 4px",
              alignItems: "center",
              boxShadow: "none",
              /* width: "50%", */
              paddingBottom: "2rem",
            }}
          >
            <ValidatorForm onSubmit={handleSubmit}>
              <Grid container>
                <Grid item xs={1} sm={3} />
                <Grid item xs={10} sm={6}>
                  <TextValidator
                    margin="normal"
                    value={contraseñaActual || ""}
                    onChange={(event) => {
                      setContraseñaActual(event.target.value);
                    }}
                    onFocus={(event) => {
                      setMensajeErrorContraseñaActual("");
                    }}
                    onBlur={(event) => {
                      validarContraseña(
                        event.target.value,
                        setMensajeErrorContraseñaActual
                      );
                    }}
                    required={true}
                    label="Contraseña Actual"
                    name="contraseñaActual"
                    autoComplete="off"
                    fullWidth
                    error={
                      mensajeErrorContraseñaActual &&
                      mensajeErrorContraseñaActual.length > 0
                    }
                    helperText={mensajeErrorContraseñaActual}
                    type={showPasswordActual ? "text" : "password"} // <-- This is where the magic happens
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={(e) =>
                              handleClickShowPassword(
                                showPasswordActual,
                                setShowPasswordActual
                              )
                            }
                            onMouseDown={(e) =>
                              handleMouseDownPassword(
                                showPasswordActual,
                                setShowPasswordActual
                              )
                            }
                          >
                            {showPasswordActual ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={1} sm={3} />

                <Grid item xs={1} sm={3} />
                <Grid item xs={10} sm={6}>
                  <TextValidator
                    margin="normal"
                    value={contraseñaNueva || ""}
                    onChange={(event) => {
                      setContraseñaNueva(event.target.value);
                    }}
                    onFocus={(event) => {
                      setMensajeErrorContraseñaNueva("");
                    }}
                    onBlur={(event) => {
                      validarContraseña(
                        event.target.value,
                        setMensajeErrorContraseñaNueva
                      );
                    }}
                    required={true}
                    label="Contraseña Nueva"
                    name="contraseñaNueva"
                    autoComplete="off"
                    fullWidth
                    error={
                      mensajeErrorContraseñaNueva &&
                      mensajeErrorContraseñaNueva.length > 0
                    }
                    helperText={mensajeErrorContraseñaNueva}
                    type={showPasswordNueva ? "text" : "password"} // <-- This is where the magic happens
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={(e) =>
                              handleClickShowPassword(
                                showPasswordNueva,
                                setShowPasswordNueva
                              )
                            }
                            onMouseDown={(e) =>
                              handleMouseDownPassword(
                                showPasswordNueva,
                                setShowPasswordNueva
                              )
                            }
                          >
                            {showPasswordNueva ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={1} sm={3} />
                <Grid item xs={1} sm={3} />
                <Grid item xs={10} sm={6}>
                  <TextValidator
                    margin="normal"
                    value={contraseñaNuevaRepetir || ""}
                    onChange={(event) => {
                      setContraseñaNuevaRepetir(event.target.value);
                    }}
                    onFocus={(event) => {
                      setMensajeErrorContraseñaNuevaRepetir("");
                    }}
                    onBlur={(event) => {
                      validarContraseñaIguales(
                        contraseñaNueva,
                        event.target.value,
                        setMensajeErrorContraseñaNuevaRepetir
                      );
                      validarContraseña(
                        event.target.value,
                        setMensajeErrorContraseñaNuevaRepetir
                      );
                    }}
                    required={true}
                    label="Contraseña Nueva Repetir"
                    name="contraseñaNuevaRepetir"
                    autoComplete="off"
                    fullWidth
                    error={
                      mensajeErrorContraseñaNuevaRepetir &&
                      mensajeErrorContraseñaNuevaRepetir.length > 0
                    }
                    helperText={mensajeErrorContraseñaNuevaRepetir}
                    type={showPasswordNuevaRepetir ? "text" : "password"} // <-- This is where the magic happens
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={(e) =>
                              handleClickShowPassword(
                                showPasswordNuevaRepetir,
                                setShowPasswordNuevaRepetir
                              )
                            }
                            onMouseDown={(e) =>
                              handleMouseDownPassword(
                                showPasswordNuevaRepetir,
                                setShowPasswordNuevaRepetir
                              )
                            }
                          >
                            {showPasswordNuevaRepetir ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={1} sm={3} />
              </Grid>
              <Grid container style={{ marginTop: "1rem", marginLeft: "4rem" }}>
                <Grid item xs={4}>
                  <Button
                    style={{ marginRight: "1rem" }}
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    className={classes.button}
                  >
                    GUARDAR
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    style={{ marginRight: "1rem" }}
                    variant="contained"
                    color="primary"
                    onClick={onClickCancelarHandler}
                    className={classes.button}
                  >
                    CANCELAR
                  </Button>
                </Grid>




              </Grid>
            </ValidatorForm>
          </Paper>
        </Grid>
        <Grid item xs={1} sm={2} lg={4}/>
      </Grid>
    </div>
  );
};

export default CambioContraseñaUsuario;
