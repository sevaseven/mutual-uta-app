import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, Card } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriasPermisos, fetchPermisos, setearUnPermiso } from "../../../actions/usuarios/permisos";
import LoadingBeforeViewData from "../../compartidos/LoadingBeforeViewData";
import { ModalCategoria } from "./ModalCategoria";
import TableGeneric from "../../compartidos/abms/TableGeneric";
import BuscadorAbm from "../../compartidos/abms/BuscadorAbm";
import FormPermiso from "./FormPermiso";
import ModalAbm from "../../compartidos/abms/ModalAbm";
import AccionesGenericoAbm from "../../compartidos/abms/AccionesGenericoAbm";


const useStyles = makeStyles({
    root: {
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "1rem"
    }
});

const HomePermisos = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const { items: permisos, item, categorias } = useSelector((state) => state.permisos);
    const [open, setOpen] = useState(false);
    const [openCategoria, setOpenCategoria] = useState(false);

    const handleSearch = (textoBuscado) => {
        dispatch(fetchPermisos(textoBuscado));
    }

    useEffect(() => {
        dispatch(fetchPermisos())
        dispatch(fetchCategoriasPermisos())
    }, [dispatch])


    if (permisos.length === 0 || categorias === null) {
        return <LoadingBeforeViewData />
    }

    return (
        <div>
            <Grid container justify="center">
                <ModalAbm title="Modificar Permiso" open={open} setOpen={setOpen}>
                    <FormPermiso permiso={item} cerrarModal={() => setOpen(false)} />
                </ModalAbm>
                <ModalCategoria open={openCategoria} setOpen={setOpenCategoria} />
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={() => setOpenCategoria(true)} style={{ float: "right", marginTop: "1rem" }}>Categorías</Button>
                </Grid>
                <Grid item xs={12} md={6} className={classes.root}>
                    <BuscadorAbm title="Buscar Permisos" handleSearch={handleSearch} />
                </Grid>
                <Grid item xs={12} md={9} style={{ marginTop: "2rem" }}>
                    <Card>
                    <TableGeneric
                        data={permisos}
                        columns={[
                            {
                                label:"",
                                customBody:(item) => (
                                    <AccionesGenericoAbm
                                        item={item}
                                        handleItemSelect={async (item) => {
                                            await dispatch(setearUnPermiso(item));
                                            setOpen(true)
                                        }}
                                    />
                                )
                            },
                            {
                                label: "ID",
                                id: "idAcceso",
                                sort: true
                            },
                            {
                                label: "Nombre",
                                id: "nombre",
                                sort: true
                            },
                            {
                                label: "Código",
                                id: "codigo",
                            },
                            {
                                label: "Categoría",
                                id: "categoria.nombre",
                                // customBody: (item) => item.categoria ? item.categoria.nombre : "Sin categoría",
                                sort: true
                            }
                        ]}
                    />
                    </Card>
                </Grid>
            </Grid>
        </div>
    );

};

export default HomePermisos;
