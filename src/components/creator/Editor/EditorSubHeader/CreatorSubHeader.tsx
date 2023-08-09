import { Stack } from "@mui/material";

export const CreatorSubHeader = ({ children }: { children: React.ReactNode }) => {

    return <Stack direction='row' height='60px'  justifyContent='center' sx={{ backgroundColor: 'var(--theme-background-secondary-color)', zIndex:-1}}>
        <Stack direction='row' width='100%' alignItems='center' justifyContent='space-between' maxWidth='var(--creator-max-width)'>
            {children}
        </Stack>
    </Stack>
}
