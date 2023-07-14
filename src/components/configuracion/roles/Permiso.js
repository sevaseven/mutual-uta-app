import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Switch, Typography, Grid } from '@material-ui/core';
import { eliminarPermisoRol, setPermisoRol } from "../../../actions/usuarios/permisos";
import { useDispatch } from "react-redux";

const useStyles = makeStyles({
  root: {
    background: '#212121'
  },
  TypographyRoot: {
    color: 'white',
    marginRight: 10
  },
  switchBase: {
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
  switchBase2: {
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
  checked: {},
  track: {},
  swithColorPrimary: {
    color: 'yellow'
  }
});

export const Permiso = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { idPermiso, idRol, descripcionPermiso, seleccionado, idRolPermiso } = props;

  const handleChange = e => {
    if (e.target.checked)
      dispatch(setPermisoRol(idRol, idPermiso));
    else
      dispatch(eliminarPermisoRol(idRolPermiso));
  }

  return (
    <>
      <Grid item lg={1} sm={1}>
        <Switch
          checked={seleccionado}
          name={descripcionPermiso}
          value={idRol}
          onChange={handleChange}
          classes={{ switchBase: classes.switchBase, checked: classes.checked, track: classes.track }}
        />
      </Grid>
      <Grid item lg={3} sm={3} >
        <Typography className={classes.TypographyRoot} >{descripcionPermiso}</Typography>
      </Grid>
    </>
  );
};