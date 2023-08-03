import { IconButton, IconButtonProps, Tooltip } from "@mui/material";

type IconButtonTooltipProps = {
    icon: React.ReactNode
    tooltip: string
    iconColor?: string
}

export const IconButtonTooltip = (props: IconButtonTooltipProps & IconButtonProps) =>
    <Tooltip title={props.tooltip}>
        <span>
            <IconButton {...props} style={{...props.style, color: props.iconColor ? props.iconColor : 'var(--theme-font-color' }} >
                {props.icon}
            </IconButton>
        </span>
    </Tooltip >