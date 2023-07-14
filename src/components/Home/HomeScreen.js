import {
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
//import CssBaseline from '@material-ui/core/CssBaseline';

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { CopyRight } from "../ui/CopyRight";
//import { BotonPortal } from "./BotonPortal";
import Chart from "../../indicadores/Chart";
import CardCantidades from "../../indicadores/CardCantidades";
import AltasBajasReactivaciones from "../../indicadores/AltasBajasReactivaciones";
// import { sitios } from "../../data/sitios";
import clsx from "clsx";
import {
  fetchCantidadAfiliacionxFecha,
  fetchCantidadAfiliacionBajasxFecha,
  fetchCantidadesxAfiliacion,
  fetchEstadoTurnos,
  fetchTurnosCantidadAfiliacionxFecha,
  fetchUltimasSolicitudes,
  indicadoresLimpiar,
  fetchAfiliacionesAltasBajasXFecha,
  getDetalleSolicitudesAutorizaciones,
} from "../../actions/indicadores";
import moment from "moment";
import { fetchSeccionalesAltas } from "../../actions/cbos/seccionales";

const useStyles = makeStyles((theme) => {
  return {
    paper: {
      padding: theme.spacing(2),
      display: "flex",
      overflow: "auto",
      flexDirection: "column",
    },
    content: {
      flexGrow: 1,
      marginTop: 25,
    },
    fixedHeight: {
      height: 220,
    },
    icon: {
      marginRight: theme.spacing(2),
    },
    heroContent: {
      padding: theme.spacing(0, 0, 0),
      marginTop: "50px",
    },
    heroButtons: {
      marginTop: theme.spacing(4),
    },
    footer: {
      padding: theme.spacing(3),
      marginTop: "auto",
      display: "flex",
      flexDirection: "column",
    },
  };
});

// Generate Sales Data
function createDataChart(date, quantityAltas, quantityBajas) {
  return { date, Altas: quantityAltas, Bajas: quantityBajas };
}

export const HomeScreen = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const lastPath = localStorage.getItem("lastPath") || "/";
  const history = useHistory();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const { seccionalesAltas, seccionalesAltasDisca } = useSelector((state) => state.seccionales);
  
  const esUsuarioSeccional = false;
  const esUsuarioNacional = true;


  const { cantXFecha, cantXFechaBajas, seccionalesAltasBajasXFecha } =
    useSelector((state) => state.indicadores);

  const idSeccional = useSelector((state) => state.auth.idSeccional);

  const seccionalUsuario = seccionalesAltas.find(
    (seccional) => seccional.idSeccional === idSeccional
  );

  const seccionalUsuarioDisca = seccionalesAltasDisca.find(
    (seccional) => seccional.idSeccional === idSeccional
  );

  /* useEffect(() => {
    dispatch(fetchSeccionalesAltas());
    dispatch(fetchCantidadAfiliacionBajasxFecha());
    dispatch(fetchAfiliacionesAltasBajasXFecha());
  }, [dispatch]); */

  useEffect(() => {
    dispatch(indicadoresLimpiar());
    
    if(esUsuarioNacional || esUsuarioSeccional) {
      dispatch(fetchSeccionalesAltas());
      dispatch(fetchCantidadAfiliacionBajasxFecha());
      dispatch(fetchAfiliacionesAltasBajasXFecha());
      dispatch(fetchUltimasSolicitudes());
      dispatch(fetchCantidadesxAfiliacion());
      dispatch(fetchCantidadAfiliacionxFecha());
      
    }
  }, [dispatch]);

  let data = seccionalesAltasBajasXFecha
    .filter(
      (seccional) =>
        seccional.descripcion_seccional ===
        seccionalUsuario?.descripcionSeccional
    )
    .slice(-8)
    .map((seccional) => {
      return createDataChart(
        moment(seccional.fecha).isValid()
          ? moment(seccional.fecha).format("L")
          : 0,
        seccional.altas,
        seccional.bajas
      );
    });

  let seccionales = [seccionalUsuario];
  let seccionalesDisca = [seccionalUsuarioDisca];

  if (!esUsuarioSeccional) {
    const ultimasAltasXFecha = [...cantXFecha.slice(-8)];
    const ultimasBajasXFEcha = [...cantXFechaBajas.slice(-8)];

    let iteradorAltas = 0;
    let iteradorBajas = 0;

    data = [];

    while (
      iteradorAltas < ultimasAltasXFecha.length &&
      iteradorBajas < ultimasBajasXFEcha.length
    ) {
      if (
        ultimasAltasXFecha[iteradorAltas].fecha_alta ===
        ultimasBajasXFEcha[iteradorBajas].fecha_baja
      ) {
        data.push(
          createDataChart(
            moment(ultimasAltasXFecha[iteradorAltas].fecha_alta).isValid()
              ? moment(ultimasAltasXFecha[iteradorAltas].fecha_alta).format("L")
              : 0,
            ultimasAltasXFecha[iteradorAltas].cantidad,
            ultimasBajasXFEcha[iteradorBajas].cantidad
          )
        );
        iteradorAltas += 1;
        iteradorBajas += 1;
      } else if (
        ultimasAltasXFecha[iteradorAltas].fecha_alta >
        ultimasBajasXFEcha[iteradorBajas].fecha_baja
      ) {
        data.push(
          createDataChart(
            moment(ultimasBajasXFEcha[iteradorBajas].fecha_baja).isValid()
              ? moment(ultimasBajasXFEcha[iteradorBajas].fecha_baja).format("L")
              : 0,
            0,
            ultimasBajasXFEcha[iteradorBajas].cantidad
          )
        );
        iteradorBajas += 1;
      } else {
        data.push(
          createDataChart(
            moment(ultimasAltasXFecha[iteradorAltas].fecha_alta).isValid()
              ? moment(ultimasAltasXFecha[iteradorAltas].fecha_alta).format("L")
              : 0,
            ultimasAltasXFecha[iteradorAltas].cantidad,
            0
          )
        );
        iteradorAltas += 1;
      }
    }

    seccionales = seccionalesAltas;
    seccionalesDisca = seccionalesAltasDisca;
  }

  if (lastPath !== "/") {
    history.push(lastPath);
  }

  const homeScreenUsuarioNacionalSeccional = (
    <>
      <Grid item xs={12} md={8} lg={9}>
        <Paper className={fixedHeightPaper}>
          <Chart data={data} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Paper className={fixedHeightPaper}>
          <CardCantidades
            nombreSeccional={
              esUsuarioSeccional ? seccionalUsuario?.descripcionSeccional : ""
            }
            cantAfiliadosActivos={
              esUsuarioSeccional ? seccionalUsuario?.activas : 0
            }
          />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <AltasBajasReactivaciones
            seccionales={seccionales}
            esUsuarioSeccional={esUsuarioSeccional}
          />
        </Paper>
      </Grid>
    </>
  );

  const homeScreenUsuarioDisca = (
    <>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <AltasBajasReactivaciones
            disca
            seccionales={seccionalesDisca}
            esUsuarioDisca={false}
          />
        </Paper>
      </Grid>
    </>
  )

  return (
    <>
      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/*{(esUsuarioNacional || esUsuarioSeccional) &&
              homeScreenUsuarioNacionalSeccional
            }
            {esUsuarioSeccional && esUsuarioDisca &&
              homeScreenUsuarioDisca
            }
            {esUsuarioAutorizaciones &&
              homeScreenUsarioAutorizaciones
            }*/}  
            {homeScreenUsuarioNacionalSeccional }     
          </Grid>
        </Container>
      </main>
      <footer className={classes.footer}>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          Desarrollos informaticos para Mutuales
        </Typography>
        <CopyRight />
      </footer>
    </>
  );
};
