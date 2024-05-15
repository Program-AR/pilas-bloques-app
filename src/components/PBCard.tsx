import { Paper, PaperProps } from "@mui/material";
import { useThemeContext } from "../theme/ThemeContext";

type PBCardProps = {
    children: React.ReactNode
}

export const PBCard = (props: PBCardProps & PaperProps) => {
    const { theme, isSmallScreen } = useThemeContext()    

    return <Paper 
        {...props} 
        elevation={3} 
        sx={{ 
            backgroundColor: theme.palette.background.default, 
            display: 'flex', 
            alignItems: 'center', 
            margin: theme.spacing(isSmallScreen?0.5:1), 
            ...props.sx 
        }}>
            {props.children}
    </Paper>
}