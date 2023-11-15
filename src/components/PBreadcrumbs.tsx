import { Breadcrumbs, BreadcrumbsProps } from "@mui/material";
import { useThemeContext } from "../theme/ThemeContext";

type PBreadcrumbsProps = {
    children: React.ReactNode
}

export const PBreadcrumbs = (props: PBreadcrumbsProps & BreadcrumbsProps) => {
    const { theme } = useThemeContext()

    return <Breadcrumbs separator=">" sx={{[theme.breakpoints.down("sm")]: { display: "none" } , '& .MuiBreadcrumbs-separator': {color: theme.palette.text.primary}, ...props.sx}} >
        {props.children}
    </Breadcrumbs>
}

