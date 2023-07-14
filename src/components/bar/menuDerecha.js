import React from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { Link } from "react-router-dom";

export const MenuDerecha = ({ classes, usuario, salirSesion }) => (
  <div className={classes.list}>
    <List>
      <ListItem button component={Link}>
        <ListItemText classes={{ primary: classes.listItemText }} primary={usuario ? usuario.userName : ""}/>
    </ListItem>
    <ListItem button onClick={salirSesion}>
    <ListItemText classes={{ primary: classes.listItemText }} primary="Salir"/>
    </ListItem>
    </List>
  </div>
);