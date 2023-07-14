import { makeStyles } from "@material-ui/core/styles";
import Image from "../../assets/LOGOS_RGB-01.png"; 
import ImageClassic from "../../assets/LOGOS_RGB-06.png"; 
export const useStylesAuth = makeStyles((theme) => ({
    root: {
      height: "97vh"
    },
    image: {
      backgroundImage: `url(${Image})`,
      backgroundRepeat: "no-repeat",
      backgroundColor:
        theme.palette.type === "light"
          ? theme.palette.grey[50]
          : theme.palette.grey[900],
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
    imageInherit: {
      backgroundImage: `url(${Image})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: 150,
      margin: "-30px 0 -50px"
    },
    imageTotem: {
      backgroundImage: `url(${ImageClassic})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
      backgroundPosition: "center",
      height: 80
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));