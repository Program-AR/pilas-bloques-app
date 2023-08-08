import { createTheme } from "@mui/material/styles"

const theme = createTheme({
    typography: {
        fontFamily: 'Nunito',
        allVariants: {
            color: 'var(--theme-font-color);'
        }
    },
    palette: {
        primary: {
            main: '#777777',
          },
        secondary: {
            main: '#000000'
        }
    },
    shape: {
        borderRadius: '10px'
    }
})

export default theme