import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { createTheme, responsiveFontSizes } from '@mui/material'
import {  blue, deepOrange, grey, green} from '@mui/material/colors';

export const lightThemeIra = responsiveFontSizes(
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
  
  export const darkThemeIra = responsiveFontSizes(
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

const lightTheme = createTheme({
	palette: {
		primary: {
			main: '#7c3aed'
		},
		secondary: {
			main: '#a78bfa'
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: 10
				}
			}
		},
		MuiDialog: {
			styleOverrides: {
				paper: {
					borderRadius: 10
				}
			}
		},
		MuiCard: {
			styleOverrides: {
				root: {
					borderRadius: 10
				}
			}
		}
	}
})

const solarizedLight = createTheme({
palette: {
	primary: {
		main: '#268bd2'
	},
	secondary: {
		main: '#859900'
	},
	background: {
		default: '#fdf6e3'
	}
},
components: {
	MuiButton: {
		styleOverrides: {
			root: {
				borderRadius: 0
			}
		}
	},
	MuiDialog: {
		styleOverrides: {
			paper: {
				borderRadius: 0
			}
		}
	},
	MuiCard: {
		styleOverrides: {
			root: {
				borderRadius: 0
			}
		}
	}
}
})

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#7c3aed'
		},
		secondary: {
			main: '#a78bfa'
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: 10
				}
			}
		},
		MuiDialog: {
			styleOverrides: {
				paper: {
					borderRadius: 10
				}
			}
		},
		MuiCard: {
			styleOverrides: {
				root: {
					borderRadius: 10
				}
			}
		}
	}
})

const solarizedDark = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#268bd2'
		},
		secondary: {
			main: '#859900'
		},
		background: {
			default: '#002b36'
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: 0
				}
			}
		},
		MuiDialog: {
			styleOverrides: {
				paper: {
					borderRadius: 0
				}
			}
		},
		MuiCard: {
			styleOverrides: {
				root: {
					borderRadius: 0
				}
			}
		}
	}
})

const themes = [
{ theme: lightTheme, icon: <LightModeIcon />},
{ theme: darkTheme, icon: <DarkModeIcon />},
{ theme: solarizedLight, icon: <Brightness7Icon />},
{ theme: solarizedDark, icon: <Brightness4Icon />},
{ theme: lightThemeIra, icon: <LightModeIcon />},
{ theme: darkThemeIra, icon: <DarkModeIcon />},
]

export default themes