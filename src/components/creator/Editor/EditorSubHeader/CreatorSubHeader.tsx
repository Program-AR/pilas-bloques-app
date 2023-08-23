import { Stack } from "@mui/material";
import { theme } from "../../../../theme/theme";

export const CreatorSubHeader = ({ children }: { children: React.ReactNode }) => {

    return <Stack direction='row' height='var(--creator-subheader-height)'  justifyContent='center' sx={{ backgroundColor: theme.palette.background.paper, zIndex:-1}}>
        <Stack direction='row' width='100%' alignItems='center' justifyContent='space-between' maxWidth='var(--creator-max-width)'>
            {children}
        </Stack>
    </Stack>
}
