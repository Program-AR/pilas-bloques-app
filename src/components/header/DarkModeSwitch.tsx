import { DarkMode, LightMode } from "@mui/icons-material";
import { PBSwitch } from "../PBSwitch";
import { LocalStorage } from "../../localStorage";
import { useThemeContext } from "../../theme/ThemeContext";

export const DarkModeSwitch = () => {
    const { darkModeEnabled, setDarkModeEnabled} = useThemeContext()

    const iconSx = {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: '3px',
        color: 'gray'
    }

    const handleToggle = () => {
        setDarkModeEnabled(!darkModeEnabled)
    }

    return <PBSwitch
        checked={darkModeEnabled}
        icon={<LightMode sx={iconSx} />}
        checkedIcon={<DarkMode sx={iconSx} />}
        onChange={handleToggle}
    />
}
