import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  historialIcon: {
    cursor: "pointer",
    borderRadius: "2rem",
    "&:hover": {
      backgroundColor: "#80808026",
    },
  },
});

const Info = (props) => {
  const classes = useStyles();
  return (
    <svg
      onClick={() => {
        props.onClick();
      }}
      xmlns="http://www.w3.org/2000/svg"
      className={classes.historialIcon}
      width="33"
      height="33"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="#00abfb"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <polyline points="12 8 12 12 14 14" />
      <path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5" />
    </svg>
  );
};

export default Info;
