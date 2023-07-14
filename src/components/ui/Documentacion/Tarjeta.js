import React, { useState, memo } from "react";

import {
  Card,
  CardActionArea,
  CardContent,
  Tooltip,
  Fab,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";

import { Carrousel } from "../../carrousel/Carrousel";
import CarrouselMini from "../../carrouselChicoConDroppable/CarrouselMini";

const useStyles = makeStyles({
  colorAdd: {
    backgroundColor: "#21b6ae",
  },
  cardStyle: {
    display: "block",
    width: 200,
    transitionDuration: "0.3s",
    height: "auto",
  },
  title: {
    fontSize: 10,
    marginLeft: 10,
    display: "-webkit-box",
    "-webkit-line-clamp": "1",
    "-webkit-box-orient": "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    "&:hover": {
      overflow: "visible",
      display: "block",
    },
  },
  btnoculto: {
    backgroundColor: "Transparent",
    backgroundRepeat: "no-repeat",
    border: "none",
    cursor: "pointer",
    overflow: "hidden",
    outline: "none",
    height: "100%",
    width: "100%",
  },
});

export const Tarjeta = memo(
  ({ urls, titulo, idTipDoc, permisoAlta, handleUpload }) => {
    const classes = useStyles();

    const [mostrarcarrousel, setMostrarcarrousel] = useState(false);

    const handleAddClick = (e) => {
      document.querySelector(`#fileSelector${idTipDoc}`).click();
    };

    const handleFileChange = (e) => {
      debugger
      if(e.target.files.length > 0)
        handleUpload(e.target.files[0], idTipDoc);
    };

    const fileFormat =
      "image/jpeg, image/jpg, image/png, application/pdf, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel";

    return (
      <>
        <input
          id={`fileSelector${idTipDoc}`}
          type="file"
          accept={fileFormat}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <Card className={classes.cardStyle}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item xs={9}>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                {`${titulo} (${!!urls ? urls.length : 0})`}
              </Typography>
            </Grid>
            {permisoAlta && (
              <Grid item xs={3}>
                <Tooltip title="Incorporar" aria-label="add">
                  <Fab
                    size="small"
                    color="primary"
                    onClick={handleAddClick}
                    className={classes.colorAdd}
                  >
                    <Add />
                  </Fab>
                </Tooltip>
              </Grid>
            )}
          </Grid>
          <CardActionArea>
            <CardContent>
              {urls?.length > 0 ? (
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                >
                  {" "}
                  <div
                    className={classes.btnoculto}
                    onClick={() => {
                      setMostrarcarrousel(!mostrarcarrousel);
                    }}
                  >
                    <CarrouselMini idTipoDocumentacion={idTipDoc} urls={urls} />
                    <Carrousel
                      urls={urls}
                      key={idTipDoc}
                      idTipoDocumentacion={idTipDoc}
                      mostrar={mostrarcarrousel}
                      titulo={titulo}
                      setMostrar={setMostrarcarrousel}
                    />
                  </div>
                </Grid>
              ) : (
                <div style={{ height: 130, textAlign: "center" }}>
                  <Typography align="center">
                    No hay documentación cargada
                  </Typography>
                </div>
              )}
            </CardContent>
          </CardActionArea>
        </Card>
      </>
    );
  }
);
