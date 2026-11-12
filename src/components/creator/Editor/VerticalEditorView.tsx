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
                flex: 1,
                minHeight: 0,
                height: '100%',
                width: '100%',
                overflow: 'hidden',
                backgroundColor: theme.palette.background.default,
            }}
        >
            {/* ── 1. Scene grid: fills remaining vertical space ── */}
            <Box
                sx={{
                    flex: 1,
                    minHeight: 0,
                    width: '100%',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Scenarios styling={styleGrid} />
            </Box>

            {/* ── 2. Bottom area: horizontal tool bar + FAB ── */}
            <Box
                sx={{
                    position: 'relative',
                    flexShrink: 0,
                    width: '100%',
                    backgroundColor: theme.palette.background.paper,
                    pb: 'env(safe-area-inset-bottom)',
                }}
            >
                {/* Floating Action Button — pencil icon — placed directly above toolbar */}
                <Fab
                    color="primary"
                    aria-label="configuración"
                    onClick={() => setDrawerOpen(true)}
                    sx={{
                        position: 'absolute',
                        right: 16,
                        bottom: 'calc(100% + 12px)',
                        zIndex: 10,
                        boxShadow: theme.shadows[6],
                    }}
                >
                    <EditIcon />
                </Fab>

                {/* Horizontal scrollable tool strip */}
                <SceneTools horizontal />
            </Box>

            {/* ── 3. Configuration drawer ── */}
            <ConfigDrawer
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            />
        </Stack>
    )
}

