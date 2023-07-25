import { Stack } from "@mui/material";

export const CreatorSubHeader = ({children}: {children: React.ReactNode}) =>
    <Stack direction="row" justifyContent="space-evenly" alignItems="center" margin="5px">
        {children}
    </Stack>
