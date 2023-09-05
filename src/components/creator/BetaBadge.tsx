import { Badge, BadgeProps } from "@mui/material";

type BetaBadgeProps = {
    children: React.ReactNode
    invisible?: boolean
    smaller?: boolean
} & BadgeProps

export const BetaBadge = (props: BetaBadgeProps) => {
    return (
        <Badge sx={props.smaller ? {padding: '1px 10px', "& .MuiBadge-badge": { fontSize: 9, height: 15, minWidth: 15 }} : {...props.sx}} invisible={!!props.invisible} color='error' badgeContent="BETA">
            {props.children}
        </Badge>
    );
};