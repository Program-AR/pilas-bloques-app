import { Stack } from "@mui/material";

export const CreatorSubHeader = ({children}: {children: React.ReactNode}) =>
    <Stack direction="row" justifyContent="center" alignItems="center" marginY="5px" spacing={20}>
        {children}
    </Stack>
