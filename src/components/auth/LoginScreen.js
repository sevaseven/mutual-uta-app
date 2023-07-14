import React, { useState } from "react";
import { useDispatch } from "react-redux";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import {
  Avatar,
  Button,
  InputAdornment,
  CssBaseline,
  IconButton,
  TextField,
  FormControlLabel,
  Checkbox,
  Paper,
  Box,
  Grid,
  Typography,
} from "@material-ui/core";
import { useStylesAuth } from "../../styles/auth/style";
import { CopyRight } from "../ui/CopyRight";
import { useForm } from "../../hooks/useForm";
import { startLogin } from "../../actions/auth";
import { AlertCambioPassword } from "./CambioPassword";
import { startUserUpdatePassword } from "../../actions/usuarios/usuarios";
import { useHistory, useLocation } from "react-router";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

export const LoginScreen = () => {
  const history = useHistory()
  const location = useLocation()
  const classes = useStylesAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [openCambioPassword, setOpenCambioPassword] = useState(false);
  const [idUsuario, setIdUsuario] = useState();
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const [errorValidacionDni, setErrorValidacionDni] = useState(
    false
  );
  const [errorValidacionPassword, setErrorValidacionPassword] = useState(false);

  const initialState = {
    dni: "",
    password: "",
  };
  const [formValues, handleInputChange] = useForm(initialState);

  const [recordar, setRecordar] = useState(false);

  const { dni, password } = formValues;

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
    if (e.target.name === "dni") {
      if (e.target.value === "" || isNaN(e.target.value)) {
        setErrorValidacionDni(true);
      } else {
        setErrorValidacionDni(false);
      }
    }
  };
  const handleRecordarChange = (e) => {
    setRecordar(e.target.checked);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    let error = false;
    setErrorValidacionDni(false);
    setErrorValidacionPassword(false);
    if (dni.length === 0 || isNaN(dni)) {
      error = true;
      setErrorValidacionDni(true);
    }
    if (password.length === 0) {
      setErrorValidacionPassword(true);
      error = true;
    }
    if (!error) {
      dispatch(startLogin(dni, password, recordar, history, false, setOpenCambioPassword, setIdUsuario));
    }
  };

  const closeModalCambioPassword = () => {
    setOpenCambioPassword(false);
  }

  const handleChangePassword = (newPassword, repeatPassword) => {
    dispatch(startUserUpdatePassword(idUsuario, password, newPassword, repeatPassword, closeModalCambioPassword));
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={7} md={9} className={classes.image} />
      <Grid item xs={12} sm={5} md={3} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            {
              location.pathname === "/auth/login-afiliado"
                ?
                <AccountCircleIcon />
                :
                <LockOutlinedIcon />
            }
          </Avatar>
          <Typography component="h1" variant="h5">
            {
              location.pathname === "/auth/login-afiliado"
                ?
                "Ingreso afiliado"
                :
                "Ingreso al Sistema"
            }
          </Typography>
          <AlertCambioPassword
            open={openCambioPassword}
            title={'Necesita cambiar la contraseña para ingresar'}
            buttonSubmit={'Aceptar'}
            buttonCancel={'Cancelar'}
            handleSubmit={handleChangePassword}
            handleClose={closeModalCambioPassword}
          />
          <form className={classes.form} noValidate>
            <TextField
              id="dni"
              variant="outlined"
              margin="normal"
              error={errorValidacionDni}
              helperText={errorValidacionDni && "Ingrese un DNI valido"}
              required={true}
              fullWidth
              label="DNI"
              name="dni"
              value={dni}
              autoComplete="off"
              autoFocus
              onChange={inputChange}
            />

            <TextField
              label="Password"
              error={errorValidacionPassword}
              helperText={errorValidacionPassword && "Ingrese Password"}
              onChange={inputChange}
              name="password"
              variant="outlined"
              value={password}
              required={true}
              fullWidth
              type={showPassword ? "text" : "password"} // <-- This is where the magic happens
              //   onChange={someChangeHandler}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="remember"
                  onChange={handleRecordarChange}
                  checked={recordar}
                  color="primary"
                />
              }
              label="Recordar"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleLogin}
            >
              Ingresar
            </Button>
            <Button
              type="button"
              fullWidth
              variant="outlined"
              color="primary"
              onClick={() => history.push("/afiliado/ingreso")}
            >
              Soy afiliado
            </Button>
            {/* <Button
              type="button"
              fullWidth
              variant="outlined"
              color="primary"
              className={classes.submit}
              onClick={() => history.push("/totem")}
            >
              Totem
            </Button> */}
            <Box mt={5}>
              <CopyRight />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};
