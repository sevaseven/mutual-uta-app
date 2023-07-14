import { createMuiTheme } from "@material-ui/core/styles";
import blueGrey from "@material-ui/core/colors/blueGrey";
import lightGreen from "@material-ui/core/colors/lightGreen";
import purple from "@material-ui/core/colors/purple";
const themeAfiliado = createMuiTheme({
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
      },
    },
    MuiButton: {
      root: {
        borderRadius: 4,
      }, 
    }, 
  },
});

export default themeAfiliado;
