import { Stack } from "@mui/material";
import { SceneTools } from "./SceneTools";
import { useState, CSSProperties } from 'react';
import { GridOptions } from "./GridOptions/GridOptions";
import { Scenarios } from "./Grid/Scenarios";

export const SceneEdition = () => {
    const [styleGrid, setStyleGrid] = useState<CSSProperties>({})

    return (
        <Stack direction="row" alignItems="stretch" sx={{ height: "100%" }}>
            <GridOptions setStyleGrid={setStyleGrid} />
            <Scenarios styling={styleGrid} />
            <SceneTools />
        </Stack>
    )
}
