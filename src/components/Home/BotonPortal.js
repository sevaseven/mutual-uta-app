import React from "react";
import { Grid, Card, CardContent, Typography } from "@material-ui/core";

import AssessmentIcon from "@material-ui/icons/Assessment";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import SyncAltIcon from "@material-ui/icons/SyncAlt";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  icono: {
    width: 120,
    height: 120,
    display: "flex",
  },
  card: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    cursor: "pointer",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));
export const BotonPortal = (props) => {
  const history =useHistory();
  const classes = useStyles();
  const { boton } = props;
  const handleClick = (idBoton) => {
    switch (parseInt(idBoton)) {
      case 1:
       history.push('/afiliaciones');
        break;
      case 2:
        break;
      case 3:
        break;
      default:
        break;
    }
  };
  return (
    <>
      <Grid item key={boton.id} xs={12} sm={6} md={4}>
        <Card
          onClick={() => {
            handleClick(boton.id);
          }}
          className={classes.card}
        >
          {boton.icon === "AssessmentIcon" ? (
            <AssessmentIcon className={classes.icono} />
          ) : boton.icon === "PeopleAltIcon" ? (
            <PeopleAltIcon className={classes.icono} />
          ) : (
            <SyncAltIcon className={classes.icono} />
          )}
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h2">
              {boton.titulo}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};
