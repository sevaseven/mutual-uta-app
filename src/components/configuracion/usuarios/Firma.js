import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardActionArea, CardContent, CardMedia, Fab, Grid, Tooltip } from '@material-ui/core';
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from '@material-ui/icons/Remove';
import Typography from "@material-ui/core/Typography";
import { startDeleteFirma, startUploadingFirma } from "../../../actions/usuarios/usuarios";
import { red } from "@material-ui/core/colors";

const baseUrl = process.env.REACT_APP_URL;

const useStyles = makeStyles((theme) => ({
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    cardStyle: {
        display: "block",
        width: 200,
        transitionDuration: "0.3s",
        height: 150,
        marginLeft: "auto",
        marginRight: "auto"
    },
    colorAdd: {
        backgroundColor: "#21b6ae",
    },
    colorAddPhoto: {
        backgroundColor: "#21b6ae",
    },
    title: {
        fontSize: 20,
        marginLeft: 10,
    },
    media: {
        maxWidth: "100%",
    },
    iconoTrash: {
        color: "#fff",
        backgroundColor: red[500],
    },
}));

export const Firma = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { usuarioSeleccionado, usuarioNuevo, seleccionado } = useSelector((state) => state.usuarios);
    const urlFirma = usuarioSeleccionado?.urlFirma;

    const timestamp = new Date().getTime();
    const url = `${baseUrl}/${usuarioSeleccionado?.urlFirma}?t=` + timestamp;

    const handlePictureUpload = () => {
        document.querySelector('#fileSelectorFirma').click();
    }

    const handleFileChangeFirma = (e) => {
        const file = e.target.files[0];
        uploadImage(file);
    }

    const uploadImage = file => {
        if (file) {
            if (!seleccionado && Object.keys(usuarioNuevo).length !== 0) {
                dispatch(startUploadingFirma(file, usuarioNuevo));
            }
            if (seleccionado && Object.keys(usuarioNuevo).length === 0) {
                dispatch(startUploadingFirma(file, usuarioSeleccionado));
            }
        }
    }

    const handleDeleteFirma = () => {
        dispatch(startDeleteFirma(usuarioSeleccionado));
    }

    return (
        <Card className={classes.cardStyle}>
            <input
                id='fileSelectorFirma'
                type='file'
                name='file'
                accept="image/x-png,image/gif,image/jpeg"
                style={{ display: 'none ' }}
                onChange={handleFileChangeFirma}
            />
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
            >
                <Tooltip title="Subir Firma" aria-label="add">
                    <Fab
                        size="small"
                        color="primary"
                        onClick={handlePictureUpload}
                        className={classes.colorAdd}
                        disabled={(props.id === 'idModal' && Object.keys(usuarioNuevo).length === 0) ? true : false}
                    >
                        <AddIcon />
                    </Fab>
                </Tooltip>
                {urlFirma && (
                    <Tooltip title="Eliminar" aria-label="remove">
                        <Fab
                            size="small"
                            onClick={handleDeleteFirma}
                            className={classes.iconoTrash}
                        >
                            <RemoveIcon />
                        </Fab>
                    </Tooltip>
                )}
            </Grid>

            <CardActionArea>
                <CardContent>
                    {urlFirma ? (
                        <Grid
                            container
                            direction="row"
                            justify="space-between"
                            alignItems="center"
                        >
                            {urlFirma && (
                                <CardMedia
                                    component="img"
                                    className={classes.media}
                                    image={url}
                                />
                            )}
                        </Grid>
                    ) : (
                        <Typography
                            className={classes.title}
                            color="textPrimary"
                            gutterBottom
                        >
                            Sin Firma
                        </Typography>
                    )}
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

