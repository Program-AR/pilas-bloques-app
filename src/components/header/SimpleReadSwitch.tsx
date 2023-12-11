import { Icon, Tooltip } from "@mui/material";
import { PBSwitch, pbIconStyle } from "../PBSwitch";
import { useTranslation } from "react-i18next"
import { useThemeContext } from "../../theme/ThemeContext";

export const SimpleReadSwitch = () => {
    const { theme, simpleReadModeEnabled, setSimpleReadModeEnabled} = useThemeContext()
    const { t } = useTranslation("others")

    const handleToggle = () => {
        setSimpleReadModeEnabled(!simpleReadModeEnabled)
    }

    return <Tooltip title={simpleReadModeEnabled ? t(`simpleReadModeOff`) : t(`simpleReadModeOn`)}>
        <PBSwitch
            checked={simpleReadModeEnabled}
            icon={<Icon sx={pbIconStyle(theme)}>a</Icon>}
            checkedIcon={<Icon sx={pbIconStyle(theme)}>A</Icon>}
            onChange={handleToggle}/>
        </Tooltip>
}
