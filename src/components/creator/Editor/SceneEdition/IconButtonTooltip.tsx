import { IconButton, IconButtonProps, Tooltip } from "@mui/material";
import theme from "../../../../theme";

type IconButtonTooltipProps = {
    icon: React.ReactNode
    tooltip: string
    iconColor?: string
}

export const IconButtonTooltip = (props: IconButtonTooltipProps & IconButtonProps) =>
    <Tooltip title={props.disabled ? '' : props.tooltip}>
        <span>
            <IconButton {...props} style={{...props.style, color: props.iconColor ? props.iconColor : theme.palette.text.primary }} >
                {props.icon}
            </IconButton>
        </span>
    </Tooltip >