import React, { useState, useEffect } from "react";
import { TextField, Grid, Button } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import { eliminarDocumento, modificarTipoDocumento, traerTipoDocumentaciones } from '../../../actions/abm/abm'
import { useDispatch, useSelector } from "react-redux";
import { eliminarMotivoBajaTurno, modificarMotivoBajaTurno } from "../../../actions/turnos/motivosBajaTurno";
import { validarSoloUnPermiso } from "../../../helpers/permisos";

export const Item = (props) => {
  const { id, name, idCard, permisoEdit, permisoDelete } = props;
  const dispatch = useDispatch();
  const [textValue, setstateTextFile] = useState(name);

  const { permisos: permisosUser } = useSelector(state => state.auth)

  const deleteItem = (id, idCard) => {
    if (idCard === 'idDoc')
      dispatch(eliminarDocumento(id))
    else if (idCard === 'idMotivosBajaTurnos')
      dispatch(eliminarMotivoBajaTurno(id));
  }

  useEffect(() => {
    dispatch(traerTipoDocumentaciones());
  }, [dispatch])

  const onChange = (id, idCard, event) => {
    setstateTextFile(event.target.value);

    if (event.target.value !== "") {
      if (idCard === 'idDoc') {
        let body = {
          idUsuario: 0,
          id: id,
          descripcion: event.target.value
        }
        dispatch(modificarTipoDocumento(id, body))
      } else if (idCard === 'idMotivosBajaTurnos') {
        let body = {
          id: id,
          descripcion: event.target.value,
        }
        dispatch(modificarMotivoBajaTurno(body));
      }
    }
  }

  return (
    <Grid container spacing={1} direction="row" justify="center" alignItems="center">
      <Grid item xs={10}>
        <TextField
          fullWidth
          id={"standard-basic" + id}
          label="Descripción"
          value={textValue}
          onChange={(event) => onChange(id, idCard, event)}
          disabled={!validarSoloUnPermiso(permisosUser, permisoEdit)}
        />
      </Grid>
      <Grid item xs={2}>
        <Button
          onClick={() => deleteItem(id, idCard)}
          disabled={!validarSoloUnPermiso(permisosUser, permisoDelete)}
        >
          <DeleteIcon />
        </Button>
      </Grid>
    </Grid>
  );

};
