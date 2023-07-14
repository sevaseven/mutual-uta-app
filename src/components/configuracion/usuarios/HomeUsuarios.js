import React ,{useEffect, useState}from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Card, Fab, Grid, Typography} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useDispatch, useSelector } from "react-redux";
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from "@material-ui/icons/Add";
import { fetchUsuarios, usuariosLimpiar } from "../../../actions/usuarios/usuarios";
import { ListaUsuarios } from "./ListaUsuarios";
import { Usuario } from "./Usuario";
import { fetchRoles } from "../../../actions/usuarios/roles";
import { ModalAlta } from "./ModalAlta";

const useStyles = makeStyles({
  root:{
      width:400,
      margin:30,
      padding:20
  },
  paper: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  buttonOk:{
    margin:10
  }
  // divider: {
  //   height: 28,
  //   margin: 4,
  // }
});

export const HomeUsuarios = () => {
  
    const classes = useStyles();
    const dispatch = useDispatch();
    const { cargada, seleccionado } = useSelector((state) => state.usuarios);
    const [textoBuscado, setTextoBuscado] = useState("");
    const [open, setOpen] = useState(false);
    
    const handleSearch = () => {
      doSearch();
    }

    const handleChange = (e) => {
      setTextoBuscado( e.target.value );
    }

    const handleKeyPress = e => {
      if (e.which === 13) {
        e.preventDefault();
        doSearch();
      }
    }

    const doSearch = () => {
      if(textoBuscado!=="")
        dispatch(fetchUsuarios(textoBuscado));
      else
        dispatch(usuariosLimpiar());
    }

    useEffect (() => {
      dispatch(usuariosLimpiar());
      dispatch( fetchRoles() );
    }, [dispatch]);
    
    return (
      <div>
        <Grid> 
          <Grid container justify="center">
            <Grid item>
              <ModalAlta open={open} setOpen={setOpen}/>
              <Fab
                className={classes.buttonOk}
                color="secondary"
                aria-label="add"
                size="medium"
                onClick={()=>setOpen(true)}
              >
                <AddIcon />
              </Fab>
            </Grid>
            <Card className={classes.root}>  
                <Typography><strong>Buscar Usuario</strong></Typography>
                <Paper component="form" className={classes.paper}>
                  <InputBase
                    className={classes.input}
                    placeholder="Nombre / Usuario / DNI"
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                  />
                  <IconButton onClick={handleSearch} className={classes.iconButton} aria-label="search">
                    <SearchIcon />
                  </IconButton>
                </Paper>
            </Card>
          </Grid>  
          {cargada && (
            <ListaUsuarios />
          )}
          {seleccionado && (
            <Usuario />
          )}
        </Grid>
      </div>
    );

};
