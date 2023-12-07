import { Switch, Theme, styled } from "@mui/material";

export const pbIconStyle = ( theme: Theme ) => {  
    return {
        backgroundColor: theme.palette.background.default, 
        borderRadius: 10,
        padding: '3px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.primary.main 
    }
}

export const PBSwitch = styled(Switch)(() => ({
    alignSelf: 'center',
    padding: 0,
    width: 60,
    height: 34,
    marginRight: 5,
    "& .MuiSwitch-switchBase": {
        padding: 0,
        margin: 5,
        backgroundColor: '#cccccc',
        opacity: 1,
        "&.Mui-checked": {
            transform: "translateX(26px)",
        },
    },
    "& .MuiSwitch-track": {
        borderRadius: 34,
        backgroundColor: '#cccccc',
        opacity: 1,
    }
    
}));