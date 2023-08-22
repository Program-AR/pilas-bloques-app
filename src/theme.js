import { createTheme } from "@mui/material/styles"

const theme = createTheme({
    typography: {
        fontFamily: 'Nunito',
        allVariants: {
            color: '#777777'
        },
    },
    palette: {
        mode: 'light',
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
    shape: {
        borderRadius: 10
    },
    components: {
        MuiButtonGroup: {
            styleOverrides: {
               grouped: {
                backgroundColor: '#e0e0e0',
                color: '#777777'
               }
            }
        }
    }
})

const dark = createTheme({
    typography: {
        fontFamily: 'Nunito',
        allVariants: {
            color: '#f8f8f8'
        },
    },
    palette: {
        mode: 'dark',
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
    shape: {
        borderRadius: 10
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
})

export default theme