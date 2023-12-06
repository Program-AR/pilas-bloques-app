import { Icon } from "@mui/material";
import { PBSwitch } from "../PBSwitch";
import { useThemeContext } from "../../theme/ThemeContext";

export const SimpleReadSwitch = () => {
    const { simpleReadModeEnabled, setSimpleReadModeEnabled} = useThemeContext()

    const iconSx = {
        backgroundColor: 'white',
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'gray'
    }

    const handleToggle = () => {
        setSimpleReadModeEnabled(!simpleReadModeEnabled)
    }

    return <PBSwitch
        checked={simpleReadModeEnabled}
        icon={<Icon sx={iconSx}>a</Icon>}
        checkedIcon={<Icon sx={iconSx}>A</Icon>}
        onChange={handleToggle}
    />
}
