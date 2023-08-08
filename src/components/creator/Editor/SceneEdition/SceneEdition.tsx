import { Stack } from "@mui/material";
import { SceneGrid } from "./Grid/SceneGrid";
import { SceneTools } from "./SceneTools";
import { useState, CSSProperties } from 'react';
import { GridOptions } from "./GridOptions/GridOptions";

export const SceneEdition = () => {
    const [styleGrid, setStyleGrid] = useState<CSSProperties>({})

    return (
        <Stack direction="row" alignItems="stretch" sx={{ height: "100%", padding: '30px' }}>
            <GridOptions setStyleGrid={setStyleGrid} />
            <SceneGrid styling={styleGrid} />
            <SceneTools />
        </Stack>
    )
}
