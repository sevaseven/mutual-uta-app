import moment from 'moment';

import ValidatedDatePicker from '../ValidatedDatePicker';

/**
 * @typedef {import('react-material-ui-form-validator').ValidatorComponentProps} ValidatorComponentProps
 * 
 * @typedef {Object} Validators
 * @prop {string[]?} name
 * @prop {string[]?} msg
 * @prop {boolean?} isRequired
 * @prop {boolean?} isLowerToday
 * @prop {boolean?} isHigherToday
 * 
 * @typedef {Object} DPG
 * @prop {Date?} DPG.value Valor de la fecha.
 * @prop {(date: Date) => void} DPG.onChange Callback para setear la fecha del componente.
 * @prop {string?} DPG.label *"Fecha"* por defecto.
 * @prop {boolean?} DPG.isDisabled Si el campo esta desabilitado, `false` por defecto.
 * @prop {boolean?} DPG.fullWidth El componente se adapta al ancho del su contenedor, `true` por defecto.
 * @prop {Validators?} DPG.validators Validaciones.
 * 
 */

/**
 * @description Este componente fue creado para hacer más fácil la migración de MUI v4 a v5 
 *              y no estar cambiando en cada archivo a futuro.
 *
 * @param {DPG & ValidatorComponentProps}
 **/
const DatePickerGeneric = ({
    onChange, 
    value = null,
    label = "Fecha",
    isDisabled = false,
    fullWidth = true,
    validators, 
    ...props
}) => {

    const limitDate = 
        validators?.isLowerToday ? 
            {maxDate: new Date()} :
        validators?.isHigherToday ? 
            {minDate: new Date()} : {};

    return (
        <ValidatedDatePicker
            {...limitDate}
            label={label}
            margin="normal"
            format="dd/MM/yyyy"
            okLabel="Aceptar"
            clearLabel="Limpiar"
            cancelLabel="Cancelar"
            fullWidth={fullWidth}
            disabled={isDisabled}
            value={
                moment(value).isValid()
                ? moment(value)
                : null
            }
            onChange={onChange}
            validators={[
                ...validators?.name ?? [],
                ...(validators.isRequired ? ["required"] : []),
                ...(validators.isLowerToday ? ["isLowerActualDate"] : []),
                ...(validators.isHigherToday ? ["isHigherActualDate"] : []),
                "isValidDate"
            ]}
            errorMessages={[
                ...validators?.msg ?? [],
                ...(validators.isRequired ? ["Este campo es obligatorio"] : []),
                ...(validators.isLowerToday ? ["La fecha no puede ser superior a la fecha actual"] : []),
                ...(validators.isHigherToday ? ["La fecha no puede ser anterior a la fecha actual"] : []),
                "La fecha ingresada no es valida"
            ]}
            KeyboardButtonProps={{
                "aria-label": "change date",
            }}
            {...props}
        />
    )
}

export default DatePickerGeneric;