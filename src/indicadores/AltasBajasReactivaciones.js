import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Title from "./Title";
import { getInfoAfiliadosPorSeccional, DescargarInfoAfiliadosBajasExcel, DescargarInfoAfiliadosAltasExcel, DescargarInfoAfiliadosReactivacionesExcel } from "../actions/indicadores";
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

// Generate Order Data
function createData(
  id,
  nombreSeccional,
  altasUltimoMes,
  bajasUltimoMes,
  reactivaciones
) {
  return {
    id,
    nombreSeccional,
    altasUltimoMes,
    bajasUltimoMes,
    reactivaciones,
  };
}

let primeraRenderizacion = true;

export default function AltasBajasReactivaciones(props) {
  const dispatch = useDispatch();
  const [openModalInfoAfiliados, setOpenModalInfoAfiliados] = useState(false);
  const [tipoInformacion, setTipoInformacion] = useState("");
  const { infoAfiliadosSeccional } = useSelector((state) => state.indicadores);
  const { seccionales } = props;
  const [idSeccional, setIdSeccional] = useState(null);

  const arrayAfiliadosAltas = infoAfiliadosSeccional?.filter(
    (infoAfiliado) => infoAfiliado.altaUltimoMes === true
  );
  const arrayAfiliadosBajas = infoAfiliadosSeccional?.filter(
    (infoAfiliado) => infoAfiliado.bajaUltimoMes === true
  );
  const arrayAfiliadosReactivaciones = infoAfiliadosSeccional?.filter(
    (infoAfiliado) => infoAfiliado.reactivacionUltimoMes === true
  );

  const infoAfiliadosSeccionalAMostrar =
    tipoInformacion === "Información Altas"
      ? arrayAfiliadosAltas
      : tipoInformacion === "Información Bajas"
        ? arrayAfiliadosBajas
        : tipoInformacion === "Información Reactivaciones"
          ? arrayAfiliadosReactivaciones
          : null;

  const openModalInfoAfiliadosHandler = (idSeccionalRow) => {
    dispatch(getInfoAfiliadosPorSeccional(idSeccionalRow));
    setOpenModalInfoAfiliados(true);
    setIdSeccional(idSeccionalRow);
  };

  const DowloadExcelInfoBajasHandler = () => {
    dispatch(DescargarInfoAfiliadosBajasExcel(idSeccional));
    setTipoInformacion("Información Bajas");
  }

  const DownloadExcelInfoAltaHandler = () => {
    dispatch(DescargarInfoAfiliadosAltasExcel(idSeccional))
    setTipoInformacion("Información Altas");
  }

  const DownloadExcelInfoReactivacionesHandler = () => {
    dispatch(DescargarInfoAfiliadosReactivacionesExcel(idSeccional))
    setTipoInformacion("Información Reactivaciones");
  }
  const closeModalInfoAfiliadosHandler = () => {
    setOpenModalInfoAfiliados(false);
  };

  if (seccionales && typeof seccionales[0] === "undefined") {
    return null;
  }

  if (seccionales.length > 1 && primeraRenderizacion) {
    seccionales.sort((a, b) =>
      a.descripcion_seccional > b.descripcion_seccional ? 1 : -1
    );
  }

  primeraRenderizacion = false;

  const rows = seccionales.map((seccional) => {
    return createData(
      seccional.idSeccional,
      seccional.descripcionSeccional,
      seccional.altasUltimoMes,
      seccional.bajasUltimoMes,
      seccional.reactivaciones
    );
  });

  const rowsCategoriaEdad =
    seccionales.length === 1
      ? seccionales[0].datosAfiliados.map((afiliado, index) => {
        const primeraParteCategoria =
          afiliado.descripcionSitRevista === "RELACION DE DEPENDENCIA"
            ? "RD"
            : afiliado?.descripcionSitRevista;
        const segundaParteCategoria = afiliado?.descripcionTipoAfiliacion;
        const categoria = primeraParteCategoria + "-" + segundaParteCategoria;
        const edad = afiliado.edad;
        const id = index;

        return { id, categoria, edad };
      })
      : null;

  const informacionAltasSeccioanl =
    seccionales.length === 1 ? (
      <React.Fragment>
        <div style={{ marginTop: "15px" }}>
          <div
            style={{
              width: "25%",
              display: "inline-block",
              float: "right",
            }}
          >
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Categoria</TableCell>
                  <TableCell>Edad</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rowsCategoriaEdad.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.categoria}</TableCell>
                    <TableCell>{row.edad}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </React.Fragment>
    ) : null;

  return (
    <React.Fragment>
      <Dialog
        fullWidth
        maxWidth="md"
        open={openModalInfoAfiliados}
        onClose={closeModalInfoAfiliadosHandler}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" style={{ paddingBottom: "0px" }}>
          {tipoInformacion}
          {tipoInformacion === "Información Bajas" &&
            <Button component="span" id="btn_excel" variant="contained" color="primary" style={{ borderRadius: "3px 0px 0px 3px", float: "right" }} startIcon={<CloudDownloadIcon />} onClick={DowloadExcelInfoBajasHandler}>Descargar Excel</Button>
            
          }
          {tipoInformacion === "Información Altas" &&
            <Button component="span" id="btn_excel" variant="contained" color="primary" style={{ borderRadius: "3px 0px 0px 3px", float: "right" }} startIcon={<CloudDownloadIcon />} onClick={DownloadExcelInfoAltaHandler}>Descargar Excel</Button>
          }
          {tipoInformacion === "Información Reactivaciones" &&
            <Button component="span" id="btn_excel" variant="contained" color="primary" style={{ borderRadius: "3px 0px 0px 3px", float: "right" }} startIcon={<CloudDownloadIcon />} onClick={DownloadExcelInfoReactivacionesHandler}>Descargar Excel</Button>
          }
        </DialogTitle>
        <DialogContent>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>CUIL</TableCell>
                <TableCell>Apellido y Nombre</TableCell>
                <TableCell>Parentesco</TableCell>
                {tipoInformacion === "Información Bajas" &&
                  <TableCell>Fecha de Baja</TableCell>
                }
                { tipoInformacion === "Información Altas" &&
                  <TableCell>Fecha de Alta</TableCell>
                }
                 { tipoInformacion === "Información Reactivaciones" &&
                  <TableCell>Fecha de Reactivación</TableCell>
                }
                {tipoInformacion === "Información Bajas" ? (
                  <TableCell>Motivo Baja</TableCell>
                ) : null}
              </TableRow>
            </TableHead>
            <TableBody>
              {infoAfiliadosSeccionalAMostrar?.map((infoAfiliado) => (
                <TableRow key={infoAfiliado.cuil}>
                  <TableCell>{infoAfiliado.cuil}</TableCell>
                  <TableCell>{infoAfiliado.apellidoNombre}</TableCell>
                  <TableCell>{infoAfiliado.descripcionParentesco}</TableCell>
                  {tipoInformacion === "Información Bajas" &&
                    <TableCell>
                      {new Date(infoAfiliado.fechaBaja).toLocaleDateString()}
                    </TableCell>
                  }
                  {tipoInformacion === "Información Altas" &&
                    <TableCell>
                      {new Date(infoAfiliado.fechaAlta).toLocaleDateString()}
                    </TableCell>
                  }
                   {tipoInformacion === "Información Reactivaciones" &&
                    <TableCell>
                      {new Date(infoAfiliado.fechaReactivacion).toLocaleDateString()}
                    </TableCell>
                  }
                  {tipoInformacion === "Información Bajas" ? (
                    <TableCell>{infoAfiliado.motivoBaja}</TableCell>
                  ) : null}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={closeModalInfoAfiliadosHandler}
            color="primary"
          >
            CERRAR
          </Button>
        </DialogActions>
      </Dialog>
      {props.disca 
        ? <Title>Afiliaciones Activas con Discapacidad Por Seccional Ultimo Mes</Title>
        : <Title>Afiliaciones Activas Por Seccional Ultimo Mes</Title>
      }
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Seccional</TableCell>
            <TableCell>Altas</TableCell>
            <TableCell>Bajas</TableCell>
            <TableCell>Reactivaciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id} >
              <TableCell>{row.nombreSeccional}</TableCell>
              <TableCell
                onClick={(e) => {
                  openModalInfoAfiliadosHandler(row.id);
                  setTipoInformacion("Información Altas");
                }}

              >
                <Typography
                  style={{
                    cursor: "pointer",
                    width: "9%",
                    fontSize: "0.87rem",
                  }}
                >
                  {row.altasUltimoMes}
                </Typography>
              </TableCell>
              <TableCell
                onClick={(e) => {
                  openModalInfoAfiliadosHandler(row.id);
                  setTipoInformacion("Información Bajas");
                }}
              >
                <Typography
                  style={{
                    cursor: "pointer",
                    width: "9%",
                    fontSize: "0.87rem",
                  }}
                >
                  {row.bajasUltimoMes}
                </Typography>
              </TableCell>
              <TableCell
                onClick={(e) => {
                  openModalInfoAfiliadosHandler(row.id);
                  setTipoInformacion("Información Reactivaciones");
                }}
              >
                <Typography
                  style={{
                    cursor: "pointer",
                    width: "9%",
                    fontSize: "0.87rem",
                  }}
                >
                  {row.reactivaciones}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {props.disca ? (props.esUsuarioDisca && props.esUsuarioSeccional) : props.esUsuarioSeccional && informacionAltasSeccioanl}
    </React.Fragment >
  );
}
