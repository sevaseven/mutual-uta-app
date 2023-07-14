import React, { useEffect } from "react";
import { makeStyles, Button } from "@material-ui/core";
import { useDispatch, useSelector } from 'react-redux';
import classNames from "classnames";
import Notifications from "@material-ui/icons/Notifications";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import styles from "../../assets/jss/material-dashboard-react/components/headerLinksStyle.js";
import { HubConnectionBuilder } from '@microsoft/signalr';
import { agregarNotificacion, modificarNotificacion, fetchNotificacionesPorUsuario, notificacionesFitrado } from "../../actions/notificaciones";
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(styles);

export const Notificaciones = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  
  const [openNotification, setOpenNotification] = React.useState(null);

  const { items } = useSelector((state) => state.notificacion);
  const auth = useSelector((state) => state.auth);

  const mostrarNot = items.length > 0 ? true : false;
  const baseUrl = process.env.REACT_APP_URL;
  
  const agergarLogPrueba = () => {
    dispatch(agregarNotificacion(10645, 9, 1, 2, null, 256, null));
    //idGrupoFamiliar, estado, idBandejaOrigen, idBandejaDestino, observacion, idAfiliado, mensaje
  }

  const handleClickNotification = event => {
    if (openNotification && openNotification.contains(event.target)) {
      setOpenNotification(null);

    } else {
      setOpenNotification(event.currentTarget);
    }
  };

  const handleCloseNotification = () => {
    setOpenNotification(null);
  };

  const handleGoNotification = (log) => {
    dispatch(modificarNotificacion(log.idBeneficiariosLog));
    history.push(`/afiliaciones/bandeja?nombre=${log.afiliado?.apellido_y_nombre}`);
  }

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl(`${baseUrl}/hubs/logs`)
      .withAutomaticReconnect()
      .build();
    connection.start()
      .then(result => {
        console.log('Connected!');
        connection.on('ReceiveMessages', messages => {
          dispatch(notificacionesFitrado(messages, auth.areas));
        });
      })
      .catch(e => console.log('Connection failed: ', e));
  }, [auth.areas, baseUrl, dispatch]);

  useEffect(() => {
    if(!auth.idAfiliado)  dispatch(fetchNotificacionesPorUsuario(auth.idUsuario));
  }, [auth.idUsuario, dispatch]);

  return (
    <>
      <Button
        onClick={agergarLogPrueba}
        style={{ display: "none" }}
      >
        PRUEBA AGREGAR LOG
      </Button>
      <div className={classes.manager}>
        <Button
          // color={window.innerWidth > 959 ? "inherit" : "white"}
          // justIcon={window.innerWidth > 959}
          // simple={window.innerWidth <= 959 ? true : undefined}
          aria-owns={openNotification ? "notification-menu-list-grow" : null}
          aria-haspopup="true"
          onClick={handleClickNotification}
          className={classes.buttonLink}
        >
          <Notifications className={classes.icons} style={{ color: "#FAFAFA" }} />
          {mostrarNot && <span className={classes.notifications}>{items.length}</span>}
          <Hidden mdUp implementation="css">
            <p onClick={handleCloseNotification} className={classes.linkText}>
              Notification
            </p>
          </Hidden>
        </Button>
        {mostrarNot && (
          <Poppers
            open={Boolean(openNotification)}
            anchorEl={openNotification}
            transition
            disablePortal={false}
            className={
              classNames({ [classes.popperClose]: !openNotification }) +
              " " +
              classes.popperNav
            }
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="notification-menu-list-grow"
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom"
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleCloseNotification}>
                    <MenuList role="menu">
                      {items.map((log) => (
                        <MenuItem
                          key={log.idBeneficiariosLog}
                          onClick={() => { handleGoNotification(log) }}
                          className={classes.dropdownItem}
                        >
                          Nuevo estado para la Pre-Afiliación de {log.afiliado?.apellido_y_nombre}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Poppers>
        )}
      </div>
    </>
  );
}
