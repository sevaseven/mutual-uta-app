import React, { useState } from "react";

import {
  Grid,
  Avatar,
  Tooltip,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  makeStyles,
  withStyles,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import { DeleteSweep } from "@material-ui/icons";
import { Droppable, DragDropContext } from "react-beautiful-dnd";

import AlertDialogSlide from "../AlertaConfirm";
import { Tarjeta } from "./Tarjeta";


const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: "#f5f5f9",
      color: "rgba(0, 0, 0, 0.87)",
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: "1px solid #dadde9",
    },
  }))(Tooltip);
  
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    title: {
      fontSize: 12,
    },
    iconoTrash: {
      width: theme.spacing(8),
      height: theme.spacing(8),
      color: "#fff",
      backgroundColor: red[500],
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    contenedorTrash: {
      height: 170,
      textAlign: "center",
      marginTop: 'auto',
      marginBottom: 'auto',
    },
    tarjetaReadOnly: {
      pointerEvents: "none",
      opacity: 0.4,
    },
  }));

export const Documentacion = (
    {documentacion, tipoDocumentacion, handleUpload, handleDelete,permisoBaja, permisoAlta}
) => {
    const classes = useStyles();
    const baseUrl = process.env.REACT_APP_URL;

    const [open, setOpen] = useState(false);
    const [idDocumentacionSelec, setIdDocumentacionSelec] = useState(0);

    let arrayURLs = [];
    let documentacionCopy = [...documentacion];
    let tipoDocumentacionCopy = [...tipoDocumentacion];

    if (tipoDocumentacion?.length > 0) {
        for (var j = 0; j < tipoDocumentacionCopy.length; j++) {
            for (var i = 0; i < documentacionCopy.length; i++) {
                if (
                    tipoDocumentacionCopy[j].idTipoDocumentaciones ===
                    documentacionCopy[i].idTipoDocumentaciones
                ) {
                let obj = {};
                obj.url =
                    baseUrl +
                    "/" +
                    documentacionCopy[i].url +
                    documentacionCopy[i].nombreDocumento;
                obj.id = documentacionCopy[i].idDocumentacion;
                arrayURLs.push(obj);
                }
            }
            tipoDocumentacionCopy[j].URLs = arrayURLs;
            arrayURLs = [];
        }
    } else {
        arrayURLs = [];
        tipoDocumentacion.forEach((url) => {
            url.URLs = [];
        });
        documentacionCopy = [];
    }

    const deleteModalHandler = (confirm) => {
        if (confirm === "SI") {
            handleDelete(idDocumentacionSelec);
            setOpen(false);
        } else {
            setOpen(false);
        }
    };

    const handleOnDragEnd = (result) => {
        const { destination } = result;
        if (!destination) {
          return;
        }
        const idDocumentacion = parseInt(
          result.draggableId.replace("documentacion", "")
        );
        if (destination.droppableId === "eliminardoc") {
            setIdDocumentacionSelec(idDocumentacion);
            setOpen(true);
        }
    };

    return (
        <>
        <AlertDialogSlide
            open={open}
            setOpen={setOpen}
            mensaje="Está seguro que desea eliminar la imagen?"
            handleDecision={deleteModalHandler}
        />
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Grid
                container
                spacing={1}
                alignItems="center"
                justify="center"
            >
                <Grid item xs={12} md={8}>
                    <Grid
                        container
                        spacing={1}
                        direction="row"
                        alignItems="center"
                        justify="center"
                    >
                    {tipoDocumentacionCopy?.map((item, index) => (
                        <Droppable
                            key={item.idTipoDocumentaciones}
                            droppableId={`idTipoDocumentaciones${item.idTipoDocumentaciones}`}
                        >
                        {(provided) => (
                            <Grid
                                key={item.idTipoDocumentaciones}
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                item
                                style={{ alignSelf: "start" }}
                            >
                                <Tarjeta
                                    item={item}
                                    key={index}
                                    titulo={`${item.descripcionDocumentacion}`}
                                    idTipDoc={item.idTipoDocumentaciones}
                                    urls={item.URLs}
                                    permisoAlta={permisoAlta}
                                    handleUpload={handleUpload}
                                />
                                {provided.placeholder}
                            </Grid>
                        )}
                        </Droppable>
                    ))}
                    </Grid>
                </Grid>
                {permisoBaja && 
                    <Grid item xs={12} md={4}>
                        <Droppable droppableId="eliminardoc">
                            {(provided) => (
                                <Card elevation={3}>
                                    <CardActionArea>
                                        <CardContent>
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                className={classes.contenedorTrash}
                                            >
                                                <Grid container justify="center" alignItems="center" style={{ height: "100%" }}>
                                                    <Grid item>
                                                        <Typography
                                                            className={classes.title}
                                                            color="textSecondary"
                                                            gutterBottom
                                                        >
                                                            Arrastre aquí para eliminar
                                                        </Typography>
                                                        <HtmlTooltip
                                                            title={
                                                                <>
                                                                <em>
                                                                    {"Eliminar"}
                                                                    <b>{" documento"}</b>
                                                                </em>
                                                                <br></br>
                                                                {"Arrastre "} <u>{"aquí"}</u> {" para eliminar"}
                                                                </>
                                                            }
                                                        >
                                                        <Avatar className={classes.iconoTrash}>
                                                            <DeleteSweep style={{ fontSize: "2rem" }} />
                                                        </Avatar>
                                                        </HtmlTooltip>
                                                        {provided.placeholder}
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            )}
                        </Droppable>
                    </Grid>
                }
            </Grid>
        </DragDropContext>
        </>
    )
}
