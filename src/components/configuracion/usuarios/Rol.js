import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Switch,Typography,Grid} from '@material-ui/core';
import { eliminarRolUsuario, setRolUsuario } from "../../../actions/usuarios/roles";
import { useDispatch } from "react-redux";

const useStyles = makeStyles({
    root:{
        background:'#212121'
    },
    TypographyRoot:{
        color:'white'
    },
    switchBase:{
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
    switchBase2:{
        color: '#bdbdbd',
        '&$checked': {
            transform: 'translateX(16px)',
            color: '#ffee58',
            '& + $track': {
              backgroundColor: '#B7A931',
              opacity: 1,
              border: 'none',
            },
          },
    },
    checked:{},
    track: {},
    swithColorPrimary:{
        color: 'yellow'
    }
});





export const Rol = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {idRol, idUsuario, descripcionRol, seleccionado, idUsuarioRol}= props; 

  const handleChange = e => {
      if(e.target.checked)
        dispatch( setRolUsuario(idUsuario, idRol) );
      else
        dispatch( eliminarRolUsuario(idUsuarioRol) );
  }

  return (
    <>
      <Grid item xs={3} md={3}>
        <Switch 
            checked={seleccionado}
            name={descripcionRol}
            value={idRol}
            onChange={handleChange}
            classes={{switchBase:classes.switchBase,checked:classes.checked,track:classes.track}}
        />
      </Grid>
      <Grid item xs={9} md={9}>
        <Typography className={classes.TypographyRoot} >{descripcionRol}</Typography>
      </Grid>
    </>
  );
};