import React from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { fetchPermisosRol } from "../../../actions/usuarios/permisos";

const useStyles = makeStyles((theme) => ({
    root: {
      width:500,
      marginBottom:25,
      borderBottom: '1px solid white',
      
    },
    icon: {
       fill: '#FAFAFA',
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: "#FAFAFA",
    },

    cssLabel: {
      color:'#FAFAFA',//required color
      
    },
  }));



export const SelectTipoRol = (props) => {
  const { roles, setIdRolSelected, setNameRolSelected } = props;
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleChange = e => {
      setIdRolSelected(e.target.value);
      setNameRolSelected(roles.find( s => s.idRol === e.target.value).descripcionRol);
      dispatch( fetchPermisosRol(e.target.value) );
  }
 
  return (
    <>
      <FormControl
        classes={{root:classes.root}}
        margin="normal"
        fullWidth={true}
      >
        <InputLabel className={classes.cssLabel}>Rol</InputLabel>
        <Select    
          name="id_tipo_afiliacion"
          onChange={handleChange}
          label="Tipo Afiliacion"
          inputProps={{
            classes: {
                root: classes.border,
                icon: classes.icon,
            },
        }}
        >
          {roles.map((t) => (
            <MenuItem key={t.idRol} value={t.idRol}>
              {t.descripcionRol}
            </MenuItem>
          ))}
          
        </Select>
      </FormControl>
    </>
  );

};
