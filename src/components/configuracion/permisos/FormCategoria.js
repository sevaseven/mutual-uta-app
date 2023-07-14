import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { Button, Grid } from "@material-ui/core";

import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from '@material-ui/icons/Cancel';
import { fetchCategoriasPermisos } from "../../../actions/usuarios/permisos";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { useForm } from "../../../hooks/useForm";
import PermisosService from "../../../services/PermisosService";
import { startAlerta } from "../../../actions/ui/alertas";

const useStyles = makeStyles({
    botonera: {
        padding: 25
    }
});

export const FormCategoria = (props) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const { categoria } = props
    const [loading, setLoading] = useState()

    const [formValues, handleInputChange, resetForm] = useForm(categoria ? categoria : { nombre: "" });

    const handleSave = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            let response;
            if(categoria){
                response=await PermisosService.guardarCategoria(formValues)
            }else{
                response=await PermisosService.crearCategoria(formValues)
            }
            const body = await response.json()
            if (response.ok) {
                dispatch(fetchCategoriasPermisos())
                dispatch(startAlerta("Se guardo exitosamente la categoría", "success"))
                resetForm()
                setLoading(false)

                if(categoria){
                    props.setCategoriaSelected(null)
                }
            } else {
                throw body
            }
        } catch (error) {
            console.log("Error al guardar la categoria del permiso: ", error)
            setLoading(false)
            if (error.errores && error.errores.mensaje) {
                dispatch(startAlerta(error.errores.mensaje, "error"))
            } else {
                dispatch(startAlerta("Ha ocurrido un error. Intente nuevamente.", "error"))
            }
        }
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
                        style={{ paddingRight: "0.5rem" }}
                        validators={["required"]}
                        errorMessages={["La descripción es requerida"]}
                    />
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
                            onClick={() => props.setOpen(false)}
                            disabled={loading}
                        >
                            CANCELAR
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            startIcon={<SaveIcon />}
                            type='submit'
                            disabled={loading}
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

export default FormCategoria;