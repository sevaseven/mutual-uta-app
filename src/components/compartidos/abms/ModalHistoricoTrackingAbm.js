import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  FormControlLabel,
  Grid,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@material-ui/core";
import { getTracking } from "../../../actions/trackingAbm";
import { types } from "../../../types/types";

const optionsfecha = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
};

const ModalHistoricoTrackingAbm = (props) => {
  const dispatch = useDispatch();

  const { items } = useSelector( (state) => state.trackingAbm );

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dense, setDense] = useState(true);

  useEffect(() => {
    dispatch({
      type: types.trackingAbmClearReducer,
    });
    dispatch( getTracking(props.tipoTrackingId, props.idClave) );
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Dialog fullWidth maxWidth="md" open={props.open} onClose={props.onClose}>
      <DialogTitle>
        Historial&nbsp;
        <span style={{ fontStyle: "italic" }}>{props.descripcion}</span>
      </DialogTitle>
      <DialogContent>
        {Array.isArray(items) &&
        items?.length > 0 ? (
          <TableContainer component={Paper} style={{ overflowX: "auto" }}>
            <Table size={dense ? "small" : "medium"}>
              <TableHead>
                <TableRow>
                  <TableCell>Fecha</TableCell>
                  <TableCell>Usuario</TableCell>
                  {(props.showCampo) && <TableCell>Campo</TableCell>}
                  <TableCell>Valor Anterior</TableCell>
                  <TableCell>Valor Nuevo</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((solicitud) => {
                    return (
                      <TableRow key={solicitud?.idHistorico.toString()}>
                        <TableCell>
                          {new Date(solicitud?.fecha).toLocaleString(
                            "es",
                            optionsfecha
                          )}
                        </TableCell>
                        <TableCell>{solicitud?.usuario?.userName}</TableCell>
                        {(props.showCampo) && <TableCell>{solicitud?.campoModificado}</TableCell>}
                        <TableCell style={{ color: "red", fontWeight: "bold" }}>
                          {solicitud.valorAnterior}
                        </TableCell>
                        <TableCell
                          style={{ color: "green", fontWeight: "bold" }}
                        >
                          {solicitud.valorNuevo}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography style={{ fontStyle: "italic", fontSize: "1.1rem" }}>
            No hay datos
          </Typography>
        )}
        {items?.length > 0 && (
          <Grid item xs={12}>
            <TablePagination
              style={{ backgroundColor: "white" }}
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={items.length}
              rowsPerPage={rowsPerPage}
              labelRowsPerPage="Registros por página"
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={dense}
                  onChange={(e) => setDense(e.target.checked)}
                />
              }
              label="Tamaño compacto"
            />
          </Grid>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ModalHistoricoTrackingAbm;
