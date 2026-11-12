import { useContext, useState, useRef } from 'react';
import { Stack, Button, Typography, Box, Paper, Popper, ClickAwayListener } from "@mui/material";
import { useTranslation } from "react-i18next";
import { LocalStorage } from '../../../../localStorage';
import { SerializedChallenge, sceneObjectByType } from '../../../serializedChallenge';
import { CreatorContext } from '../CreatorContext';
import { PBCard } from '../../../PBCard';
import { useThemeContext } from '../../../../theme/ThemeContext';

type SceneToolsProps = {
    /** When true, renders a horizontal scrollable toolbar for mobile */
    horizontal?: boolean
}

export const SceneTools = ({ horizontal = false }: SceneToolsProps) => {
    type ToolProps = {
        id: string
        image?: string
    }

    const { theme } = useThemeContext()

    const { t } = useTranslation('creator');
    const { selectedTool, setSelectedTool } = useContext(CreatorContext)

    const challenge: SerializedChallenge | null = LocalStorage.getCreatorChallenge()

    const selectTool = (e: React.MouseEvent<HTMLElement>) => {
        setSelectedTool(e.currentTarget.id)
    }

    const imagePath = 'imagenes/sceneImages'
    const imagePathScene = `${imagePath}/${challenge?.scene.type}`

    // ─── Tool button ──────────────────────────────────────────────────────────
    const Tool = (props: ToolProps) => {
        const isSelected = props.id === selectedTool
        return <Button
            variant='outlined'
            id={props.id}
            data-testid={props.id}
            onClick={selectTool}
            style={{
                backgroundImage: `url("${props.image}")`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPositionX: "center",
                backgroundPositionY: "center",
                boxShadow: `0 0px calc(10px * ${Number(isSelected)})`,
                // Horizontal mode: bigger square tap-targets
                height: horizontal ? '56px' : '40px',
                minWidth: horizontal ? '56px' : undefined,
                width: horizontal ? '56px' : undefined,
                borderRadius: horizontal ? '12px' : undefined,
                marginTop: horizontal ? 0 : theme.spacing(0.5),
                // Highlight selected tool in horizontal mode with a colored border
                borderColor: isSelected ? theme.palette.primary.main : undefined,
                borderWidth: isSelected ? 2 : undefined,
            }}
        />
    }

    // ─── Tool group ───────────────────────────────────────────────────────────
    type ToolGroupProps = {
        children: React.ReactNode
        type: string
        name?: string
    }

    const ToolGroup = (props: ToolGroupProps) =>
        <Stack
            alignItems="center"
            sx={{
                marginY: horizontal ? 0 : theme.spacing(0.5),
                marginX: horizontal ? theme.spacing(0.75) : 0,
                flexShrink: 0,
            }}
        >
            {props.children}
            <Typography
                sx={{
                    textAlign: 'center',
                    lineHeight: "1",
                    marginTop: theme.spacing(0.5),
                    fontSize: horizontal ? '0.6rem' : undefined,
                    textTransform: 'uppercase',
                    letterSpacing: horizontal ? '0.03em' : undefined,
                }}
                variant="subtitle2"
            >
                {t(`tools.${props.type}`)}{props.name}
            </Typography>
        </Stack>

    // ─── Individual tools ─────────────────────────────────────────────────────
    const PutObstacleTool = () =>
        <ToolGroup type='putObstacle'>
            <Tool id="O" image={`${imagePathScene}/O.png`} />
        </ToolGroup>

    const PutObjectTool = () => {
        const validCells = sceneObjectByType(challenge!.scene.type).validCells;
        const [menuOpen, setMenuOpen] = useState(false);
        const anchorRef = useRef<HTMLDivElement | null>(null);

        // Desktop: render all valid cells vertically inside PBCard
        if (!horizontal) {
            return (
                <ToolGroup type='putObject'>
                    {validCells.map((object) =>
                        <Tool id={object} key={object} image={`${imagePathScene}/${object}.png`} />)}
                </ToolGroup>
            );
        }

        // Horizontal mobile: single object available -> render standard tool button
        if (validCells.length <= 1) {
            return (
                <ToolGroup type='putObject'>
                    <Tool id={validCells[0]} image={`${imagePathScene}/${validCells[0]}.png`} />
                </ToolGroup>
            );
        }

        // Horizontal mobile with multiple objects:
        // Main button with an upward popover submenu (position: absolute upward / placement="top")
        const activeObject = validCells.includes(selectedTool) ? selectedTool : validCells[0];
        const isSelected = validCells.includes(selectedTool);

        const handleToggle = () => {
            if (!isSelected) {
                setSelectedTool(activeObject);
            }
            setMenuOpen((prev) => !prev);
        };

        return (
            <ClickAwayListener onClickAway={() => setMenuOpen(false)}>
                <Box ref={anchorRef} sx={{ position: 'relative' }}>
                    <ToolGroup type='putObject'>
                        <Button
                            variant='outlined'
                            id="putObject-tool-main"
                            data-testid="putObject-tool-main"
                            onClick={handleToggle}
                            style={{
                                backgroundImage: `url("${imagePathScene}/${activeObject}.png")`,
                                backgroundSize: "contain",
                                backgroundRepeat: "no-repeat",
                                backgroundPositionX: "center",
                                backgroundPositionY: "center",
                                boxShadow: `0 0px calc(10px * ${Number(isSelected)})`,
                                height: '56px',
                                minWidth: '56px',
                                width: '56px',
                                borderRadius: '12px',
                                marginTop: 0,
                                borderColor: isSelected ? theme.palette.primary.main : undefined,
                                borderWidth: isSelected ? 2 : undefined,
                            }}
                        />
                    </ToolGroup>

                    {/* Upward submenu popover: absolute positioned above toolbar (bottom: 100%) */}
                    <Popper
                        open={menuOpen}
                        anchorEl={anchorRef.current}
                        placement="top"
                        sx={{ zIndex: 1200, mb: 1 }}
                    >
                        <Paper
                            elevation={6}
                            sx={{
                                p: 0.75,
                                display: 'flex',
                                flexDirection: 'row',
                                gap: 0.75,
                                borderRadius: '12px',
                                backgroundColor: theme.palette.background.paper,
                                border: `1px solid ${theme.palette.divider}`,
                                boxShadow: theme.shadows[6],
                            }}
                        >
                            {validCells.map((object) => {
                                const isObjSelected = object === selectedTool;
                                return (
                                    <Button
                                        key={object}
                                        id={object}
                                        data-testid={`object-tool-${object}`}
                                        onClick={() => {
                                            setSelectedTool(object);
                                            setMenuOpen(false);
                                        }}
                                        variant="outlined"
                                        style={{
                                            backgroundImage: `url("${imagePathScene}/${object}.png")`,
                                            backgroundSize: "contain",
                                            backgroundRepeat: "no-repeat",
                                            backgroundPositionX: "center",
                                            backgroundPositionY: "center",
                                            height: '48px',
                                            width: '48px',
                                            minWidth: '48px',
                                            borderRadius: '8px',
                                            boxShadow: isObjSelected ? `0 0 8px ${theme.palette.primary.main}` : undefined,
                                            borderColor: isObjSelected ? theme.palette.primary.main : theme.palette.divider,
                                            borderWidth: isObjSelected ? 2 : 1,
                                        }}
                                    />
                                );
                            })}
                        </Paper>
                    </Popper>
                </Box>
            </ClickAwayListener>
        );
    };

    const PutActorTool = () =>
        <ToolGroup type='putActor' name={t(`selection.cards.${challenge?.scene.type}.name`)!}>
            <Tool id="A" image={`${imagePathScene}/tool.png`} />
        </ToolGroup>

    const DeleteTool = () =>
        <ToolGroup type='delete'>
            <Tool id="-" image={`${imagePath}/eraser.png`} />
        </ToolGroup>

    // ─── Horizontal layout (mobile bottom bar) ────────────────────────────────
    if (horizontal) {
        return (
            <Stack
                direction="row"
                alignItems="flex-end"
                sx={{
                    overflowX: 'auto',
                    overflowY: 'hidden',
                    padding: theme.spacing(1, 1.5),
                    WebkitOverflowScrolling: 'touch',
                    '&::-webkit-scrollbar': { display: 'none' },
                    scrollbarWidth: 'none',
                    backgroundColor: theme.palette.background.paper,
                    borderTop: `1px solid ${theme.palette.divider}`,
                    width: '100%',
                }}
            >
                <PutActorTool />
                <PutObstacleTool />
                <PutObjectTool />
                <DeleteTool />
            </Stack>
        )
    }

    // ─── Vertical layout (desktop side panel) ─────────────────────────────────
    return (
        <PBCard>
            <Stack alignItems="center" justifyContent="flex-start" style={{ padding: theme.spacing(1), height: "100%" }}>
                <PutActorTool />
                <PutObstacleTool />
                <PutObjectTool />
                <DeleteTool />
            </Stack>
        </PBCard>
    )
}
