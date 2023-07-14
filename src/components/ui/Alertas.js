import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Slide, Snackbar } from "@material-ui/core";
import { finishAlerta } from "../../actions/ui/alertas";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));
export const Alertas = React.memo(() => {
  const classes = useStyles();
  const alerta = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  const TransitionDown = (props) => {
    return <Slide {...props} direction="down" />;
  };
  return (
    <div className={classes.root}>
      {
        <Snackbar
          TransitionComponent={TransitionDown}
          message={<span id="message-id">{alerta ? alerta.mensaje : ""}</span>}
          open={alerta ? alerta.open : false}
          autoHideDuration={alerta.autoHide ? 5000 : null}
          onClose={(event, reason) => {
            if (alerta.open && reason === 'timeout') {
              dispatch(finishAlerta());
            }
          }}
        >
          <Alert variant="filled" severity={alerta ? alerta.tipo : ""} onClose={alerta.autoHide ? undefined : (event, reason) => {
            if (alerta.open) {
              dispatch(finishAlerta());
            }
          }}>
            <AlertTitle>{alerta ? alerta.titulo : ""}</AlertTitle>
            {alerta ? alerta.mensaje : ""}
          </Alert>
        </Snackbar>
      }
    </div>
  );
});
