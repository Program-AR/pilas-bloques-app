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
            primary: '#777777'
        },
        background: {
            default: '#f8f8f8',
            paper: '#f1f1f1'
        }
    },
    shape: {
        borderRadius: 10
    }
})

export default theme