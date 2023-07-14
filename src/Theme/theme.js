import { createMuiTheme } from "@material-ui/core/styles";
import colorBack from "../assets/back1.jpg";
import blueGrey from "@material-ui/core/colors/blueGrey";
import lightGreen from "@material-ui/core/colors/lightGreen";
import purple from "@material-ui/core/colors/purple";
const theme = createMuiTheme({
  palette: {
    primary: {
      light: purple[300],
      main: '#68389F',
      dark: purple[700],
    },
    secondary: {
      light: blueGrey[300],
      main: '#63616C',
      dark: blueGrey[700],
    },
    three: {
      light: blueGrey[300],
      main: 'mediumpurple',
      dark: blueGrey[700],
    },
  },
  typography: {
    useNextVariants: true,
  },
  disabledButton: {
    backgroundColor: lightGreen || 'red'
  },
  
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          backgroundImage: `url(${colorBack})`,
          padding: 10
          //"url(https://designshack.net/wp-content/uploads/gradient-background.jpg)"
        },
      },
    },
    MuiButton: {
      root: {
        borderRadius: 4,
      }, 
    },
    MuiInputLabel: { 
      root: { 
        // color:'black',
        fontSize: 13, 
      },
    }, 
  },
});

export default theme;
