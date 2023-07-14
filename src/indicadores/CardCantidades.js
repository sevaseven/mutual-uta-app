import React from 'react';
import { useSelector } from "react-redux";
// import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import moment from "moment";

/* function preventDefault(event) {
  event.preventDefault();
} */

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function CardCantidades(props) {
  const classes = useStyles();

  const { activas } = useSelector( (state) => state.indicadores );

  return (
    <React.Fragment>
      <Title>Afiliados Activos</Title>
      <Typography component="p" variant="h4">
        {props.cantAfiliadosActivos === 0 ? activas[0] && activas[0]?.titulares + activas[0]?.familiares : props.cantAfiliadosActivos}
      </Typography>
      <Typography variant="h5">{props.nombreSeccional}</Typography>
      <Typography component="h6" variant="h6">
      (Titulares + Familiares) 
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        al {moment().format('LL')}
      </Typography>
      {/* <div>
        <Link color="primary" href="#" onClick={preventDefault}>
         Ampliar Info
        </Link>
      </div> */}
    </React.Fragment>
  );
}