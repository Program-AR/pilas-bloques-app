import { Tooltip } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";
import { PBSwitch, pbIconStyle } from "../PBSwitch";
import { useTranslation } from "react-i18next"
import { useThemeContext } from "../../theme/ThemeContext";

export const DarkModeSwitch = () => {
    const { theme, darkModeEnabled, setDarkModeEnabled} = useThemeContext()
    const { t } = useTranslation("others")

    const handleToggle = () => {
        setDarkModeEnabled(!darkModeEnabled)
    }
    
    return <Tooltip title={darkModeEnabled ? t(`lightThemeMode`) : t(`darkThemeMode`) }>
        <PBSwitch
            checked={darkModeEnabled}
            icon={<LightMode sx={pbIconStyle(theme)}/>}
            checkedIcon={<DarkMode sx={pbIconStyle(theme)}/>}
            onChange={handleToggle}/>
        </Tooltip>
}
