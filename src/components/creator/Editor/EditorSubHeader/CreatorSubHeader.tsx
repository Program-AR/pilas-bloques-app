import { Stack } from "@mui/material";

export const CreatorSubHeader = ({children}: {children: React.ReactNode}) =>
   <Stack height="60px" direction="row" justifyContent="center" alignItems="center" spacing={20} sx={{backgroundColor: 'var(--theme-background-secondary-color)'}}>
        {children}
    </Stack>
