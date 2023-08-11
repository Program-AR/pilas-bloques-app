import { Badge, BadgeProps } from "@mui/material";

type BetaBadgeProps = {
    children: React.ReactNode
    invisible?: boolean
} & BadgeProps

export const BetaBadge = (props: BetaBadgeProps) => {
    return (
        <Badge {...props} invisible={!!props.invisible} color='error' badgeContent="BETA">
            {props.children}
        </Badge>
    );
};