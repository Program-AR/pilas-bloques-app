import { ThemeOptions, createTheme } from "@mui/material";
import { ThemeMode } from "./ThemeContext";

const commonTheme: ThemeOptions = {
    shape: {
        borderRadius: 10
    },
    typography: {
        fontFamily: 'Nunito',
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

export const getDesignTokens = (mode: ThemeMode): ThemeOptions => {
    const _theme =  mode === 'light' ? lightTheme : darkTheme

    const theme: ThemeOptions = {
        ...commonTheme,
        palette: _theme.palette,
        typography: {
            ..._theme.typography,
            ...commonTheme.typography
        },
        components: _theme.components
    }

    return theme
}

export const theme = createTheme(getDesignTokens('light'));
