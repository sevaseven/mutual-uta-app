import React from "react";
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { Rol } from "./Rol";

const useStyles = makeStyles({
    root:{
        width:350,
        padding: 20,
        background:'#212121'
    },
    rootTitulo:{
        color:'white',
        marginBottom:10,
        textAlign: "center"
    }
});



export const Roles = () => {
  const classes = useStyles();
  const { items, rolesUsuarioSeleccionado } = useSelector((state) => state.roles);
  const { idUsuario: idUsuarioSel } = useSelector((state) => state.usuarios.usuarioSeleccionado);
  
  const roles = items.map( i => {
    const tieneRol = rolesUsuarioSeleccionado.find( s => s.idRol === i.idRol );

    return {
        idRol: i.idRol,
        idUsuario: idUsuarioSel,
        descripcionRol: i.descripcionRol,
        seleccionado: tieneRol ? true : false,
        idUsuarioRol: tieneRol ? tieneRol.id : null,
    }
  })

  return (
    <>
      <Typography component="h3" variant="h5" className={classes.rootTitulo}>Roles</Typography>
      {
        items&&
          <Grid item xs={12} >
            <Grid container item alignItems="center" className={classes.root}>
            {
              roles.map(rol => 
                  <Rol
                      key={rol.idRol}
                      idRol={rol.idRol}
                      idUsuario={rol.idUsuario}
                      seleccionado={rol.seleccionado}
                      descripcionRol={rol.descripcionRol}
                      idUsuarioRol={rol.idUsuarioRol}
                  />
              )
            }
            </Grid>
          </Grid>
      }
    </>
  );

};
