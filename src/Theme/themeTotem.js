import { createMuiTheme } from "@material-ui/core/styles";
import colorBack from "../assets/back1.jpg";
import lightGreen from "@material-ui/core/colors/lightGreen";
import purple from "@material-ui/core/colors/purple";

const themeTotem = createMuiTheme({
  palette: {
    primary: {
      light: purple[300],
      main: '#68389F',
      dark: purple[700],
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
          padding: 0
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

export default themeTotem;
