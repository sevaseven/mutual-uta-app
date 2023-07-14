import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
//import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({open,setOpen,handleDecision,mensaje}) {

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {mensaje}
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-slide-description">
            Desea Eliminar la Imagen?
          </DialogContentText> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{handleDecision('NO')}} color="primary">
            Cancelar
          </Button>
          <Button onClick={()=>{handleDecision('SI')}} color="secondary">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
