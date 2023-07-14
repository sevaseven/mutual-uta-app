import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {Grid, TextField, Typography} from '@material-ui/core';
import { SelectTipoRol } from "./SelectTipoRol";
import { fetchRoles, modificarRolUsuario } from "../../../actions/usuarios/roles"
import SaveIcon from '@material-ui/icons/Save';
import { Permisos } from "./Permisos";
import { fetchCategoriasPermisos, fetchPermisos } from "../../../actions/usuarios/permisos";
import { ModalAlta } from "../abm/ModalAlta";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles({
  root: {
    marginTop: 20
  },
  rootTitulo:{
      color: 'white',
      marginBottom:20
  },
  rootInput: {
    marginTop: 17,
    marginLeft: 30,
    width: 400,
    borderBottom: '1px solid white',
  },
  iconButton: {
    marginTop: 25,
    color:'white',
  }
});


export const HomeRoles = () => {
  const {items} =useSelector((state)=>state.roles)
  const dispatch = useDispatch();
  const classes = useStyles();

  const [idRolSelected, setIdRolSelected] = useState();
  const [nameRolSelected, setNameRolSelected] = useState();
  const [open, setOpen] = React.useState(false);

  useEffect (() => {
    dispatch( fetchRoles() );
    dispatch( fetchPermisos() );
    dispatch( fetchCategoriasPermisos() );
  }, [dispatch])
  
  const handleModify = () => {
    dispatch( modificarRolUsuario(idRolSelected, nameRolSelected) );
  }

  const handleChange = e => {
    setNameRolSelected( e.target.value );;
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid lg={12} className={classes.root}>  
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid >
            <SelectTipoRol 
                roles={items} 
                setIdRolSelected={setIdRolSelected}
                setNameRolSelected={setNameRolSelected}
            />
            <Fab
              color="primary" 
              aria-label="add"
              onClick={handleClickOpen}>
              <AddIcon />
            </Fab>
            {nameRolSelected && (
              <>
                <TextField 
                  id="standard-basic" 
                  label="Editar" 
                  name="nameRolSelected"
                  value={nameRolSelected}
                  onChange={handleChange}
                  className={classes.rootInput}
                  InputLabelProps={{ shrink: true }}
                />
                <Fab 
                  onClick={handleModify} 
                  color="primary" 
                  aria-label="save">
                  <SaveIcon />
                </Fab>
              </>
            )}
          </Grid>
          <Typography component="h3" variant="h5" className={classes.rootTitulo}>Permisos</Typography>
          <Grid>
            { idRolSelected && (
              <Permisos 
                idRolSelected={idRolSelected}
              />
            )}
          </Grid>
          <ModalAlta  
            idCard={"idRol"}
            handleClose={handleClose} 
            titulo={"Rol"}
            open={open}
          />
        </Grid>
    </Grid>
  );

};
