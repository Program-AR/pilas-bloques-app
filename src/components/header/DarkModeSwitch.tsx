import { DarkMode, LightMode } from "@mui/icons-material";
import { PBSwitch } from "../PBSwitch";
import { LocalStorage } from "../../localStorage";
import { useState } from "react";

export const DarkModeSwitch = () => {
    const [darkModeEnabled, setDarkModeEnabled] = useState(LocalStorage.getDarkModeValue())

    const iconSx = {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: '3px',
        color: 'gray'
    }

    const handleToggle = () => {
        setDarkModeEnabled(!darkModeEnabled)
        LocalStorage.toggleDarkMode()
    }

    return <PBSwitch
        checked={darkModeEnabled}
        icon={<LightMode sx={iconSx} />}
        checkedIcon={<DarkMode sx={iconSx} />}
        onChange={handleToggle}
    />
}
