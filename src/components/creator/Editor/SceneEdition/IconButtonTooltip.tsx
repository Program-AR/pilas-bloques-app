import { IconButton, IconButtonProps, Tooltip } from "@mui/material";
import { useThemeContext } from "../../../../theme/ThemeContext";

type IconButtonTooltipProps = {
    icon: React.ReactNode
    tooltip: string
    iconColor?: string
}

export const IconButtonTooltip = (props: IconButtonTooltipProps & IconButtonProps) => {
    const { theme } = useThemeContext()

    return <Tooltip title={props.disabled ? '' : props.tooltip}>
        <span>
            <IconButton {...props} style={{ ...props.style, color: props.iconColor ? props.iconColor : theme.palette.text.primary }} >
                {props.icon}
            </IconButton>
        </span>
    </Tooltip >
}