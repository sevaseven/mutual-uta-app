import React, { useEffect } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    Grid,
    InputAdornment,
    IconButton,
    Slide,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useForm } from "../../hooks/useForm";
import {
    ValidatorForm,
    TextValidator,
} from "react-material-ui-form-validator";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



export const  AlertCambioPassword = (props) => {
  const stateInitial = {
    newPassword: '',
    repeatPassword: '',
  }  
  const [formValues, handleInputChange] = useForm(stateInitial);
  const { newPassword, repeatPassword } = formValues;
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const handleSave = () => {
      props.handleSubmit(newPassword, repeatPassword);
  }

  useEffect (() => {
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
        if (value !== newPassword) {
            return false;
        }
        return true;
    });
    ValidatorForm.addValidationRule('alfaCharacters', (value) => {
        if(value.length >= 8)
			{		
				let letter = false;
				let number = false;
				// let otherCharacter = false;
				
				for(let i = 0;i<value.length;i++)
				{
					if(value.charCodeAt(i) >= 65 && value.charCodeAt(i) <= 122)
                        letter = true;
					else if(value.charCodeAt(i) >= 48 && value.charCodeAt(i) <= 57)
						number = true;
					// else
                    //     otherCharacter = true;
				}
				if(letter === true && number === true)
					return true;
			}
			return false;
    });
},)

  return (
    <Grid item>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      > 
        <ValidatorForm onSubmit={handleSave}>
            <Grid item container justify="center">
                <DialogTitle id="alert-dialog-slide-title" style={{background: '#9C27B0', color: 'white'}}>{props.title}</DialogTitle>
            </Grid>
            <Grid item container justify="center" style={{marginTop: 20}}>
                <TextValidator
                    style={{maxWidth: 266}}
                    label="Password nuevo *"
                    name="newPassword"
                    variant="outlined"
                    value={newPassword}
                    validators={['required','alfaCharacters']}
                    errorMessages={['Este campo es obligatorio','La contraseña debe ser de 8 caracteres alfanumericos']}
                    onChange={handleInputChange}
                    type={showPassword ? "text" : "password"} // <-- This is where the magic happens
                    InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                        >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                        </InputAdornment>
                    ),
                    }}
                />
            </Grid>
            <Grid item container justify="center" style={{marginTop: 10}}>
                <TextValidator
                    label="Confirmación Password *"
                    name="repeatPassword"
                    variant="outlined"
                    value={repeatPassword}
                    validators={['isPasswordMatch', 'required']}
                    errorMessages={['Las 2 contraseñas deben ser idénticas', 'Este campo es obligatorio']}
                    onChange={handleInputChange}
                    type={showPassword ? "text" : "password"} // <-- This is where the magic happens
                    InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                        >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                        </InputAdornment>
                    ),
                    }}
                />
            </Grid>
            <DialogActions>
            <Grid item container justify="center" style={{marginTop: 15, marginBottom: 10}}>
                <Button onClick={props.handleClose} variant="contained" color="secondary">
                    {props.buttonCancel}
                </Button>
                <Button type='submit' style={{ marginLeft: 150 }} variant="contained" color="primary">
                    {props.buttonSubmit}
                </Button>
            </Grid>
            </DialogActions>
        </ValidatorForm>
      </Dialog>
    </Grid>
  );
}