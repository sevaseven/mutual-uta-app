import React from "react";
import { Accordion, AccordionDetails, AccordionSummary, Card, CardContent, Grid, Typography } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { Permiso } from "./Permiso";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles({
    root: {
        width: 950,
        background: '#212121'
    }
});



export const Permisos = (props) => {
    const classes = useStyles();
    const { idRolSelected } = props;
    const { items, permisosRolSeleccionado, categorias } = useSelector((state) => state.permisos);

    const permisos = items.map(i => {

        const tienePermiso = permisosRolSeleccionado.find(s => s.idAcceso === i.idAcceso);

        return {
            idPermiso: i.idAcceso,
            idRol: idRolSelected,
            descripcionPermiso: i.nombre,
            seleccionado: tienePermiso ? true : false,
            idRolPermiso: tienePermiso ? tienePermiso.idAccesoPorRol : null,
            idCategoria: i.idCategoria,
            categoria: i.categoria 
        }
    })

    return (
        <>
            <Card className={classes.root}>
                <CardContent>
                    <Grid container>
                        {
                            categorias.map(e => (
                                <Grid key={e.idCategoria} item md={12} style={{ marginTop: "0.5rem" }}>
                                    <Accordion  style={{ backgroundColor: "#424242" }}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls={`panel${e.idCategoria}a-content`}
                                            id={`panel${e.idCategoria}a-header`}
                                        >
                                            <Typography style={{color:"#fff"}}>{e.nombre}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Grid container alignItems="center">
                                                {
                                                    permisos.filter(permisofilter => permisofilter.idCategoria === e.idCategoria).map(permiso => {
                                                        return <Permiso
                                                            key={permiso.idPermiso}
                                                            idPermiso={permiso.idPermiso}
                                                            idRol={permiso.idRol}
                                                            seleccionado={permiso.seleccionado}
                                                            descripcionPermiso={permiso.descripcionPermiso}
                                                            idRolPermiso={permiso.idRolPermiso}
                                                        />
                                                    })
                                                }
                                            </Grid>
                                        </AccordionDetails>
                                    </Accordion>
                                </Grid>
                            ))
                        }
                        <Grid item md={12} style={{ marginTop: "0.5rem" }}>
                            <Accordion style={{ backgroundColor: "#424242" }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls={`panel100a-content`}
                                    id={`panel100a-header`}
                                >
                                    <Typography style={{color:"#fff"}}>Sin Categoría</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container alignItems="center">
                                        {
                                            permisos.filter(permisofilter => permisofilter.idCategoria === null).map(permiso => {
                                                return <Permiso
                                                    key={permiso.idPermiso}
                                                    idPermiso={permiso.idPermiso}
                                                    idRol={permiso.idRol}
                                                    seleccionado={permiso.seleccionado}
                                                    descripcionPermiso={permiso.descripcionPermiso}
                                                    idRolPermiso={permiso.idRolPermiso}
                                                />
                                            })
                                        }
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>

                    </Grid>
                </CardContent>
            </Card>
        </>
    );

};
