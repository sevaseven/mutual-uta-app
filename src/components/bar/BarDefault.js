import React, { useState, useRef, useEffect } from "react";
import {
  Toolbar,
  IconButton,
  Typography,
  makeStyles,
  Button,
  Avatar,
  Drawer,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
} from "@material-ui/core";
import FotoUsuarioTemp from "../../assets/avatar.png";
import { MenuDerecha } from "./menuDerecha";
import { useHistory, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../actions/auth";
import { MenuIzquierda } from "./menuIzquierda";
import { Notificaciones } from "./Notificaciones";
import { VERSIONADO } from '../../utils/constants';
import logo from "../../assets/LOGOS_RGB-04.png";
const baseUrl = process.env.REACT_APP_URL;

const useStyles = makeStyles((theme) => ({
  seccionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  seccionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  versionado: {
    marginTop: 13,
    marginLeft: 7,
  },
  grow: {
    flexGrow: 1,
  },
  avatarSize: {
    width: 40,
    height: 40,
  },
  list: {
    width: 250,
  },
  listItemText: {
    fontSize: "14px",
    fontWeight: 600,
    paddingLeft: "15px",
    color: "#212121",
  },
  white: {
    background: "white",
    marginRight: 10,
  },
}));

const BarSesionDefault = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const url = auth.imagenPerfil && `${baseUrl}/${auth.imagenPerfil}`;
  const history = useHistory();
  const [abrirMenuIzquierda, setAbrirMenuIzquierda] = useState(false);
  const [abrirMenuDerecha, setAbrirMenuDerecha] = useState(false);
  const [openUsuarioMenu, setOpenUsuarioMenu] = useState(false);
  const anchorRef = useRef(null);

  const cerrarMenuDerecha = () => {
    setAbrirMenuDerecha(false);
  };
  const abrirMenuIzquierdaAction = () => {
    setAbrirMenuIzquierda(true);
  };
  const cerrarMenuIzquierda = () => {
    setAbrirMenuIzquierda(false);
  };
  const salirSesionApp = () => {
    dispatch(startLogout(history));
  };

  const abrirMenuDerechaAction = () => {
    setAbrirMenuDerecha(true);
  };

  const handleToggle = () => {
    setOpenUsuarioMenu((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpenUsuarioMenu(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpenUsuarioMenu(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(openUsuarioMenu);

  useEffect(() => {
    if (prevOpen.current === true && openUsuarioMenu === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = openUsuarioMenu;
  }, [openUsuarioMenu]);

  const openNavMenuUsuarioHandler = (event) => {
    handleClose(event);
    history.push("/cambio-contraseña");
  };

  const openNavMenuCredencialesRecetasHandler = (event) => {
    handleClose(event);
    history.push("/credenciales-recetas");
  };

  return (
    <React.Fragment>
      <Drawer
        open={abrirMenuIzquierda}
        onClose={cerrarMenuIzquierda}
        anchor="left"
      >
        <div className={classes.list} onKeyDown={cerrarMenuIzquierda}>
          <MenuIzquierda handleclose={cerrarMenuIzquierda} classes={classes} />
        </div>
      </Drawer>
      <Drawer
        open={abrirMenuDerecha}
        onClose={cerrarMenuDerecha}
        anchor="right"
      >
        <div
          className={classes.list}
          onClick={cerrarMenuDerecha}
          onKeyDown={cerrarMenuDerecha}
        >
          <MenuDerecha
            classes={classes}
            salirSesion={salirSesionApp}
            usuario={auth ? auth.userName : null}
          />
        </div>
      </Drawer>

      <Toolbar>
        <IconButton color="inherit" onClick={abrirMenuIzquierdaAction}>
          <i className="material-icons">menu</i>
        </IconButton>
        <Avatar src={logo} className={classes.white}></Avatar>{" "}
        <Typography variant="h6">OSPEDYC</Typography>
        <div className={classes.grow}></div>
        <div className={classes.seccionDesktop}>
          <Button color="inherit" onClick={salirSesionApp}>
            Salir
          </Button>
          <Notificaciones />
          <Button
            color="inherit"
            ref={anchorRef}
            aria-controls={openUsuarioMenu ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            {auth ? auth.userName : ""}
          </Button>
          <Popper
            open={openUsuarioMenu}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={openUsuarioMenu}
                      id="menu-list-grow"
                      onKeyDown={handleListKeyDown}
                    >
                      <MenuItem onClick={openNavMenuUsuarioHandler}>
                        Cambiar Contraseña
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>

          <Avatar src={url || FotoUsuarioTemp}></Avatar>
          <Typography variant="caption" className={classes.versionado} component="h6">
            {VERSIONADO.VERSION_ACTUAL}
          </Typography>
        </div>
        <div className={classes.seccionMobile}>
          <IconButton color="inherit" onClick={abrirMenuDerechaAction}>
            <i className="material-icons">more_vert</i>
          </IconButton>
        </div>
      </Toolbar>
    </React.Fragment>
  );
};

export default withRouter(BarSesionDefault);
