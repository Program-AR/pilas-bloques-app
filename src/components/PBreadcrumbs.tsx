import { Breadcrumbs, BreadcrumbsProps, styled, useMediaQuery } from "@mui/material";
import { useThemeContext } from "../theme/ThemeContext";

type PBreadcrumbsProps = {
    children: React.ReactNode
}

export const PBreadcrumbs = (props: PBreadcrumbsProps & BreadcrumbsProps) => {
    const { theme } = useThemeContext()

    return <Breadcrumbs separator=">" sx={{'& .MuiBreadcrumbs-separator': {color: theme.palette.text.primary}, ...props.sx}} >
        {props.children}
    </Breadcrumbs>
}