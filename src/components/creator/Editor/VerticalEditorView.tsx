import { Box, Fab, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { CSSProperties, useState } from "react";
import { SceneTools } from "./SceneEdition/SceneTools";
import { Scenarios } from "./SceneEdition/Grid/Scenarios";
import { ConfigDrawer } from "./ConfigDrawer";
import { useThemeContext } from "../../../theme/ThemeContext";

/**
 * VerticalEditorView
 *
 * Mobile layout for the challenge editor.
 * Renders:
 *  1. The interactive scene grid occupying the available height.
 *  2. A horizontally-scrollable tool bar at the bottom.
 *  3. A floating action button (pencil) that opens the ConfigDrawer.
 */
export const VerticalEditorView = () => {
    const { theme } = useThemeContext()
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [styleGrid, setStyleGrid] = useState<CSSProperties>({})

    return (
        <Stack
            direction="column"
            sx={{
                height: '100%',
                overflow: 'hidden',
                backgroundColor: theme.palette.background.default,
            }}
        >
            {/* ── 1. Scene grid: fills remaining vertical space ── */}
            <Box sx={{ flex: 1, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Scenarios styling={styleGrid} />
            </Box>

            {/* ── 2. Bottom area: horizontal tool bar + FAB ── */}
            <Box
                sx={{
                    position: 'relative',
                    flexShrink: 0,
                    paddingBottom: 'env(safe-area-inset-bottom)',
                }}
            >
                {/* Horizontal scrollable tool strip */}
                <SceneTools horizontal />

                {/* Floating Action Button — pencil icon — opens config drawer */}
                <Fab
                    color="primary"
                    aria-label="configuración"
                    onClick={() => setDrawerOpen(true)}
                    sx={{
                        position: 'absolute',
                        right: 16,
                        // Centre the FAB vertically relative to the tool bar.
                        // The SceneTools bar is ~80px tall (56px button + 2*12px padding);
                        // 50% of that minus half the FAB (28px) = 12px from bottom of bar.
                        bottom: `calc(env(safe-area-inset-bottom) + 12px)`,
                        zIndex: 10,
                        boxShadow: theme.shadows[6],
                    }}
                >
                    <EditIcon />
                </Fab>
            </Box>

            {/* ── 3. Configuration drawer ── */}
            <ConfigDrawer
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            />
        </Stack>
    )
}

