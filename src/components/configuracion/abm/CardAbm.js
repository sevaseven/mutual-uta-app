import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { HeaderCardAbm } from "./HeaderCardAbm"
import { Card, Grid, Divider, Typography } from "@material-ui/core";
import { Item } from "./Item";

const useStyles = makeStyles({
    root: {
        width: 400,
        margin: 30,
        padding: 20,
    },
    rootList: {
        marginTop: "20px"
    },
    header: {
        paddingLeft: "15%"
    },
});

export const CardAbm = (props) => {
    const classes = useStyles();
    const { lista, titulo, id, permisoAdd, permisoEdit, permisoDelete } = props;

    return (
        <Grid container justify="center">
            <Card className={classes.root}>
                <Grid container spacing={1} className={classes.header}>
                    <HeaderCardAbm
                        idCard={id}
                        titulo={titulo}
                        permisoAdd={permisoAdd}
                    />
                </Grid>
                <Grid container justify="center">
                    <Typography><strong>{titulo}</strong></Typography>
                </Grid>
                <Divider />
                <Grid className={classes.rootList}>
                    {(function () {
                        if (id === 'idMotivosBajaTurnos') {
                            return (
                                lista &&
                                lista.map(res =>
                                    <Item
                                        key={res.idMbt}
                                        idCard={id}
                                        deleteItem={props.deleteItem}
                                        id={res.idMbt}
                                        name={res.descripcion}
                                        permisoEdit={permisoEdit}
                                        permisoDelete={permisoDelete}
                                    />
                                )
                            );
                        }
                        else {
                            return (
                                lista &&
                                lista.map(res =>
                                    <Item
                                        key={res.idTipoDocumentaciones ? res.idTipoDocumentaciones : res.id_tipo_afiliacion}
                                        idCard={id}
                                        deleteItem={props.deleteItem}
                                        id={res.idTipoDocumentaciones ? res.idTipoDocumentaciones : res.id_tipo_afiliacion}
                                        name={res.descripcionDocumentacion ? res.descripcionDocumentacion : res.descripcion_afiliacion}
                                        permisoEdit={permisoEdit}
                                        permisoDelete={permisoDelete}
                                    />
                                )
                            );
                        }
                    })()}
                </Grid>
            </Card>
        </Grid>
    );
};
