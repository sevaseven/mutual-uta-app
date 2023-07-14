import React from "react";
import { Backdrop, Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 9999,
    color: "#fff",
  },
}));

export default function Spinner() {
  const classes = useStyles();
  const { open } = useSelector((state) => state.spinner);

  return (
    <div>
      <Backdrop className={classes.backdrop} open={open}>
        {
            <div style={{ textAlign: "center" }}>
              <CircularProgress size={50} color="inherit" />
              <Typography variant="h6">
                Aguarde...
              </Typography>
            </div>
        }
      </Backdrop>
    </div>
  );
}
