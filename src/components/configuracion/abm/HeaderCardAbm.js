import React, { useState } from "react";
import { Fab, Grid, makeStyles, TextField } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import { ModalAlta } from "./ModalAlta";
import { useDispatch, useSelector } from "react-redux";
import { buscarDocumento } from "../../../actions/abm/abm";
import { buscarMotivoBajaTurno } from "../../../actions/turnos/motivosBajaTurno";
import { validarSoloUnPermiso } from "../../../helpers/permisos";

const useStyles = makeStyles({
  root:{
    marginBottom:20,
  },
  RootFab:{
    width:"50px",
    height:"50px",
  }
});

export const HeaderCardAbm = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [textBuscador,setBuscador] =  useState("");
  const { permisos: permisosUser } = useSelector(state => state.auth)
  const { idCard, titulo, permisoAdd } = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const onChange = (idCard,e) => {
    setBuscador(e.target.value);
    if(idCard==='idDoc')
      dispatch(buscarDocumento(e.target.value));
    else if(idCard==='idMotivosBajaTurnos')
      dispatch( buscarMotivoBajaTurno(e.target.value) );
  }

  return (
    <Grid container spacing={1} className={classes.root} direction="row" justify="center">
      <Grid item xs={8}>
        <TextField fullWidth onChange={(e)=>onChange(idCard,e)} value={textBuscador} label="Buscar" />
        <ModalAlta idCard={idCard} open={open} handleClose={handleClose} titulo={titulo} />
      </Grid>
      <Grid item xs={4}>
        <Fab 
          onClick={handleClickOpen} 
          classes={{root:classes.RootFab}} 
          disabled={!validarSoloUnPermiso(permisosUser, permisoAdd)}
          color="primary" 
          aria-label="add"
        >
          <AddIcon />
        </Fab>
      </Grid>
    </Grid>
  );
};
