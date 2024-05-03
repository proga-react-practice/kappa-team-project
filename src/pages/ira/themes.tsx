
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import {  blue, deepOrange, grey, green} from '@mui/material/colors';

export const lightTheme = responsiveFontSizes(
    createTheme({
      palette: {
        mode: 'light',
        primary: green,
        secondary: {
          main: blue[300],
        },
        
        divider: grey[600],
        background: {
          paper: '#fff',
        },
        text: {
          primary: '#000',
          secondary: grey[600],
        },
      },
    })
  );
  
  export const darkTheme = responsiveFontSizes(
    createTheme({
      palette: {
        mode: 'dark',
        primary: deepOrange,
        secondary: {
          main: green[700],
        },
        divider: deepOrange[700],
        background: {
          default: '#333',
          paper: '#222',
        },
        text: {
          primary: '#fff',
          secondary: grey[200],
        },
      },
    })
  );