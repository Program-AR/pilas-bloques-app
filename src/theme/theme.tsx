import { ThemeOptions } from "@mui/material";
import { deepmerge } from '@mui/utils';

const commonTheme: ThemeOptions = {
        shape: {
            borderRadius: 10
        },
        typography: {
            fontFamily: 'Nunito'
        }
    }

const lightTheme: ThemeOptions = {
    typography: {
        allVariants: {
            color: '#777777'
        },
    },
    palette: {
        primary: {
            main: '#777777',
        },
        secondary: {
            main: '#ffb600'
        },
        text: {
            primary: '#777777',
            secondary: '#ebebeb'
        },
        background: {
            default: '#f8f8f8',
            paper: '#f1f1f1'
        },
    },
    components: {
        MuiButtonGroup: {
            styleOverrides: {
                grouped: {
                    backgroundColor: '#e0e0e0',
                }
            }
        }
    }
}

const darkTheme: ThemeOptions = {
    typography: {
        allVariants: {
            color: '#f8f8f8'
        },
    },
    palette: {
        primary: {
            main: '#f8f8f8',
        },
        secondary: {
            main: '#ffb600'
        },
        text: {
            primary: '#f8f8f8',
            secondary: '#323232'
        },
        background: {
            default: '#202020',
            paper: '#181818'
        }
    },
    components: {
        MuiButtonGroup: {
            styleOverrides: {
                grouped: {
                    backgroundColor: '#252424',
                }
            }
        }
    }

}

export const getDesignTokens = (darkModeEnabled: boolean, simpleReadModeEnabled: boolean): ThemeOptions => 
      deepmerge( {typography: { allVariants: { textTransform: simpleReadModeEnabled ? 'uppercase': 'initial'}}}, deepmerge(darkModeEnabled ? darkTheme : lightTheme,commonTheme))