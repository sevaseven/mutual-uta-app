import { Dialog, DialogTitle } from '@material-ui/core';
import React, { useEffect } from 'react'
import { useDispatch , useSelector } from 'react-redux';
import { getCredenciales } from '../../actions/webAfiliado/afiliadoVariosAction';
import LoadingBeforeViewData from './LoadingBeforeViewData';
import CardCredencial from '../webAfiliado/credenciales/CardCredencial';
import { startAlerta } from "../../actions/ui/alertas"

const ModalCredenciales = ({ open, setOpen, ...props }) => {
    const dispatch = useDispatch()
    const { consultaAfiliado,afiliado } = useSelector((state) => state.afiliacion);
    const { credenciales } = useSelector(state => state.afiliadoVarios)

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (props.desdeBandejaAceptadas) {
            dispatch(startAlerta(`PreAfiliación aceptada`, "success", "Aviso"));
        } else {
            dispatch(getCredenciales(consultaAfiliado.id_afiliado ?? afiliado.id_afiliado))
        }
        // eslint-disable-next-line
    }, [])

    return (
        <Dialog maxWidth="md" fullWidth onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">Credenciales</DialogTitle>
            {
                credenciales === null
                    ?
                    <LoadingBeforeViewData />
                    :
                    credenciales.map(credencial => {
                        return (
                            <CardCredencial externo={true} key={credencial.numero} credencial={credencial} />
                        )
                    })
            }
        </Dialog>
    )
}

export default ModalCredenciales
