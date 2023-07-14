import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import { agregarRol } from "../../../actions/usuarios/roles";
import { agregarTipoDocumento } from "../../../actions/abm/abm";
import {agregarTipoAfiliacion} from "../../../actions/abm/abmAfiliaciones"
import { agregarMotivoBajaTurno } from "../../../actions/turnos/motivosBajaTurno";
import { useDispatch } from "react-redux";

export const ModalAlta = (props) => {
 const {idCard} = props;
  const [descripcionText, setDescripcion] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e)=>{
    setDescripcion(e.target.value);
  }

  const agregarDescription=(idCard)=>{
    if(idCard==='idDoc')
      dispatch(agregarTipoDocumento(descripcionText))
    else if(idCard==='idAfil')
      dispatch(agregarTipoAfiliacion(descripcionText))
    else if(idCard==='idRol')
      dispatch( agregarRol(descripcionText) );
    else if(idCard==='idMotivosBajaTurnos')
      dispatch( agregarMotivoBajaTurno(descripcionText) );
    setDescripcion("");
    props.handleClose();
  }

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Agregar {props.titulo}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Descripción"
            type="text"
            fullWidth
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Cancelar
          </Button>
          {!descripcionText?<Button  disabled onClick={()=>agregarDescription(idCard)} color="primary">
            Aceptar
          </Button>:<Button   onClick={()=>agregarDescription(idCard)} color="primary">
           Aceptar
          </Button>}
        </DialogActions>
      </Dialog>
    </div>
  );
};