import { Paper, PaperProps } from "@mui/material";
import theme from "../theme";


type PBCardProps = {
    children: React.ReactNode
}

export const PBCard = (props: PBCardProps & PaperProps) => 
    <Paper 
        {...props} 
        elevation={3} 
        sx={{ ...props.sx, backgroundColor:'var(--theme-background-color)', display: 'flex', alignItems: 'center', margin: theme.spacing(1)}}>
            {props.children}
    </Paper>