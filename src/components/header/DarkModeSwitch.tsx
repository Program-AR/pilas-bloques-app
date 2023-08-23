import { Switch, styled } from "@mui/material"
import { DarkMode, LightMode } from "@mui/icons-material";

export const DarkModeSwitch = () => {


    return <>
        <PBSwitch icon={<LightMode
            sx={{
                backgroundColor: 'white',
                borderRadius: 10,
                padding: '3px',
                color: 'gray'
            }} />} checkedIcon={<DarkMode color='primary'
                sx={{
                    backgroundColor: 'white',
                    borderRadius: 10,
                    padding: '3px',
                    color: 'gray'

                }} />}></PBSwitch>
    </>
}

const PBSwitch = styled(Switch)(() => ({
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