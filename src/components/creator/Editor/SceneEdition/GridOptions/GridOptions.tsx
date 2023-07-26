import { Stack } from "@mui/material";
import { SizeEditor, StyleGridProps } from "./SizeEditor";

export const GridOptions = (props: StyleGridProps) => {

    return (
        <Stack direction="row" alignItems="center" justifyContent="space-between">
            <SizeEditor setStyleGrid={props.setStyleGrid}/>
        </Stack>
    )
}
