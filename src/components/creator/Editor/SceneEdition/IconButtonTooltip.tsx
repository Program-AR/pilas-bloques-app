import { IconButton, IconButtonProps, Tooltip } from "@mui/material";

type IconButtonTooltipProps = {
    icon: React.ReactNode
    tooltip: string
}

export const IconButtonTooltip = (props: IconButtonTooltipProps & IconButtonProps) =>
    <Tooltip title={props.tooltip}>
        <IconButton {...props} style={{ color: 'var(--theme-font-color' }} >
            {props.icon}
        </IconButton>
    </Tooltip >