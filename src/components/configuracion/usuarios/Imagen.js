import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardActionArea, CardContent, CardMedia, Fab, Grid, Tooltip } from '@material-ui/core';
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from '@material-ui/icons/Remove';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import Typography from "@material-ui/core/Typography";
import { startDeleteImage, startUploadingImage } from "../../../actions/usuarios/usuarios";
import { red } from "@material-ui/core/colors";
import { Camera } from '../camera/Camera';

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

export const Imagen = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { usuarioSeleccionado,usuarioNuevo,seleccionado } = useSelector((state) => state.usuarios);
    const urlImagen = usuarioSeleccionado?.urlImagen;
    const [showCamera, setShowCamera] = React.useState(false);

    const timestamp = new Date().getTime(); 
    const url = `${ baseUrl }/${ usuarioSeleccionado?.urlImagen }?t=` + timestamp;

    const handlePictureUpload = () => {
        document.querySelector('#fileSelector').click();
    }

    const haldleStartCamera = () => {
        setShowCamera(true);
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        uploadImage( file );
    }

    const callbackTakePhoto = file => {
        uploadImage( file );
    }

    const uploadImage = file => {
        if( file ){
            if(!seleccionado && Object.keys(usuarioNuevo).length!==0){
                dispatch( startUploadingImage( file, usuarioNuevo ) );
            }
            if(seleccionado && Object.keys(usuarioNuevo).length===0){
                dispatch( startUploadingImage( file, usuarioSeleccionado ) );
            }
        }
    }

    const handleDelete = () => {
        dispatch( startDeleteImage( usuarioSeleccionado ) );
    }

    return ( 
        <Card className={classes.cardStyle}>
            <input 
                id='fileSelector'
                type='file'
                name='file'
                accept="image/x-png,image/gif,image/jpeg"
                style={{ display: 'none '}}
                onChange={ handleFileChange }
            />
            <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            >
                <Tooltip title="Subir Imagen" aria-label="add">
                    <Fab
                    size="small"
                    color="primary"
                    onClick={handlePictureUpload}
                    className={classes.colorAdd}
                    disabled={(props.id==='idModal' && Object.keys(usuarioNuevo).length===0)?true:false}
                    >
                    <AddIcon />
                    </Fab>
                </Tooltip>
                <Tooltip title="Tomar Foto" aria-label="add">
                    <Fab
                    size="small"
                    color="primary"
                    onClick={haldleStartCamera}
                    className={classes.colorAddPhoto}
                    disabled={(props.id==='idModal' && Object.keys(usuarioNuevo).length===0)?true:false}
                    >
                    <AddAPhotoIcon />
                    </Fab>
                </Tooltip>
                <Camera 
                    open={showCamera} 
                    onClose={() => setShowCamera(false)} 
                    setShowCamera={setShowCamera}
                    fileName={'userImage'} 
                    callback={callbackTakePhoto}
                >
                </Camera>
                {urlImagen && (
                    <Tooltip title="Eliminar" aria-label="remove">
                        <Fab
                        size="small"
                        onClick={handleDelete}
                        className={classes.iconoTrash}
                        >
                        <RemoveIcon />
                        </Fab>
                    </Tooltip>
                )}
            </Grid>

            <CardActionArea>
            <CardContent>
                {urlImagen ? (
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                    >
                        {urlImagen && (
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
                        Sin Imagen
                    </Typography>
                )}
            </CardContent>
            </CardActionArea>
        </Card>
     );
}
 
