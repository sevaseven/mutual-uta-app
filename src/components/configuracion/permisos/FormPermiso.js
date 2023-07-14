import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid, MenuItem } from "@material-ui/core";

import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from '@material-ui/icons/Cancel';
import { fetchGuardarPermiso } from "../../../actions/usuarios/permisos";
import { SelectValidator, TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { useForm } from "../../../hooks/useForm";

const useStyles = makeStyles({
    botonera: {
        padding: 25
    }
});

export const FormPermiso = (props) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const { permiso } = props
    const { categorias } = useSelector((state) => state.permisos);

    const [formValues, handleInputChange] = useForm(permiso);

    const handleSave = (e) => {
        e.preventDefault()
        dispatch(fetchGuardarPermiso(formValues, formValues.idAcceso));
    }

    return (
        <ValidatorForm onSubmit={handleSave}>
            <Grid container style={{ padding: 25 }}>
                <Grid item xs={12} md={6}>
                    <TextValidator
                        margin="normal"
                        label="Descripción"
                        name="nombre"
                        value={formValues.nombre}
                        autoComplete="off"
                        onChange={handleInputChange}
                        fullWidth
                        style={{paddingRight:"0.5rem"}}
                        validators={["required"]}
                        errorMessages={["La descripción es requerida"]}
                    />
                </Grid>
                <Grid item xs={12} md={6} >
                    <SelectValidator
                        margin="normal"
                        label="Categoria"
                        name="idCategoria"
                        value={formValues.idCategoria}
                        autoComplete="off"
                        onChange={handleInputChange}
                        fullWidth
                    >
                        <MenuItem value={""}><em>Seleccione</em></MenuItem>
                        {
                            categorias.map(e=><MenuItem key={e.idCategoria} value={e.idCategoria}>{e.nombre}</MenuItem>)
                        }
                    </SelectValidator>
                </Grid>
            </Grid>

                <Grid container className={classes.botonera} >
                    <Grid item xs={12}>
                        <Grid
                            container
                            spacing={1}
                            direction="row"
                            justify="flex-end"
                            alignItems="center"
                        >
                            <Button
                                variant="contained"
                                color="secondary"
                                size="small"
                                startIcon={<CancelIcon />}
                                onClick={props.cerrarModal}

                            >
                                CANCELAR
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                startIcon={<SaveIcon />}
                                type='submit'
                                style={{ marginLeft: "0.5rem" }}
                            >
                                GUARDAR
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
        </ValidatorForm>
    );

};

export default FormPermiso;