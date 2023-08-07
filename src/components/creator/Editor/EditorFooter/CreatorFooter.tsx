import { Stack } from "@mui/material";

export const CreatorFooter = ({children}: {children: React.ReactNode}) =>
    <Stack component="footer" style={{backgroundColor: 'var(--theme-background-secondary-color)'}} direction="row" position="sticky" bottom="0" width="100%" maxHeight="70" justifyContent="space-evenly" alignItems="center" margin="5px">
        {children}
    </Stack>