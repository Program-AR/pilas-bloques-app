import {
    Box,
    Drawer,
    IconButton,
    Stack,
    Tab,
    Tabs,
    TextField,
    Typography,
} from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight, Close, ArrowBack } from "@mui/icons-material";
import ExtensionIcon from '@mui/icons-material/Extension';
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { LocalStorage } from "../../../localStorage";
import { defaultChallenge, SerializedChallenge } from "../../serializedChallenge";
import { CreatorContext } from "./CreatorContext";
import { useThemeContext } from "../../../theme/ThemeContext";
import { SizeEditor } from "./SceneEdition/GridOptions/SizeEditor";
import { ScenarioEditionButtons } from "./SceneEdition/GridOptions/ScenarioEditionButtons";
import { SceneGrid } from "./SceneEdition/Grid/SceneGrid";
import { ToolboxContent, ToolboxState } from "./ChallengeDetailsEdition/ToolBoxEditor/ToolBoxEditor";
import { IconButtonTooltip } from "./SceneEdition/IconButtonTooltip";
import { MarkdownEditor } from "./MarkDownEdition/MarkdownEditor";

// ─── Types ────────────────────────────────────────────────────────────────────

type ConfigDrawerProps = {
    open: boolean
    onClose: () => void
}

// ─── Tab panel helper ─────────────────────────────────────────────────────────

type TabPanelProps = {
    children: React.ReactNode
    value: number
    index: number
}

const TabPanel = ({ children, value, index }: TabPanelProps) =>
    <Box
        role="tabpanel"
        hidden={value !== index}
        id={`config-tabpanel-${index}`}
        aria-labelledby={`config-tab-${index}`}
        sx={{ flex: 1, overflowY: 'auto', p: 2 }}
    >
        {value === index && children}
    </Box>

// ─── Section header (matches the reference design) ───────────────────────────

type SectionHeaderProps = {
    icon: React.ReactNode
    title: string
    subtitle: string
}

const SectionHeader = ({ icon, title, subtitle }: SectionHeaderProps) =>
    <Stack spacing={0.5} mb={2}>
        <Stack direction="row" alignItems="center" spacing={1}>
            {icon}
            <Typography variant="h6" fontWeight="bold">{title}</Typography>
        </Stack>
        <Typography variant="body2">{subtitle}</Typography>
    </Stack>

// ─── Tab 0: Escenario ─────────────────────────────────────────────────────────

const SceneTab = () => {
    const { t } = useTranslation('creator')
    const { theme } = useThemeContext()
    const { index, maps, setIndex } = useContext(CreatorContext)

    const [styleGrid, setStyleGrid] = useState<React.CSSProperties>({})

    const isFirstMap = index === 0
    const isLastMap = index === maps.length - 1

    return (
        <Stack spacing={2}>
            {/* Scenario navigation bar */}
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 2,
                    px: 1,
                    py: 0.5,
                }}
            >
                <IconButtonTooltip
                    icon={<KeyboardArrowLeft />}
                    tooltip={t('mapNavigation.prev')}
                    onClick={() => setIndex(index - 1)}
                    disabled={isFirstMap}
                    sx={{ visibility: isFirstMap ? 'hidden' : 'visible' }}
                />
                <Typography variant="subtitle2" fontWeight="bold" letterSpacing={1}>
                    {t('drawer.scene.scenarioLabel', { current: index + 1, total: maps.length })}
                </Typography>
                <IconButtonTooltip
                    icon={<KeyboardArrowRight />}
                    tooltip={t('mapNavigation.next')}
                    onClick={() => setIndex(index + 1)}
                    disabled={isLastMap}
                    sx={{ visibility: isLastMap ? 'hidden' : 'visible' }}
                />
                {/* Duplicate / Delete */}
                <ScenarioEditionButtons />
            </Stack>

            {/* Grid size controls */}
            <SizeEditor setStyleGrid={setStyleGrid} />

            {/* Mini grid preview */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                <SceneGrid styling={styleGrid} />
            </Box>
        </Stack>
    )
}

// ─── Tab 1: Bloques ───────────────────────────────────────────────────────────

const BlocksTab = () => {
    const { t } = useTranslation('creator')

    const storageChallenge = LocalStorage.getCreatorChallenge()
    const challenge: SerializedChallenge = storageChallenge ?? defaultChallenge('Duba')

    const currentToolBox = challenge.toolbox.blocks
    const [toolBoxItems, setToolBoxItems] = useState<string[]>(currentToolBox)
    const toolboxState = new ToolboxState(challenge, toolBoxItems)

    const currentIsCategorized = challenge.toolbox.categorized
    const [isCategorized, setIsCategorized] = useState(
        currentIsCategorized || toolboxState.categorizationShouldBeForced()
    )

    // Persist to LocalStorage
    const persist = (items: string[], categorized: boolean) => {
        challenge.toolbox.blocks = items
        challenge.toolbox.categorized = categorized || toolboxState.categorizationShouldBeForced()
        LocalStorage.saveCreatorChallenge(challenge)
    }

    const handleSetToolBoxItems = (items: string[]) => {
        setToolBoxItems(items)
        persist(items, isCategorized)
    }

    const handleSetIsCategorized = (val: boolean) => {
        setIsCategorized(val)
        persist(toolBoxItems, val)
    }

    return (
        <Stack spacing={2}>
            <SectionHeader
                icon={<ExtensionIcon color="primary" />}
                title={t('drawer.blocks.title')}
                subtitle={t('drawer.blocks.subtitle')}
            />
            <ToolboxContent
                toolboxState={toolboxState}
                toolBoxItems={toolBoxItems}
                setToolBoxItems={handleSetToolBoxItems}
                isCategorized={isCategorized}
                setIsCategorized={handleSetIsCategorized}
                challenge={challenge}
            />
        </Stack>
    )
}

// ─── Tab 2: Información ───────────────────────────────────────────────────────

const InfoTab = () => {
    const { t } = useTranslation('creator')

    const storageChallenge = LocalStorage.getCreatorChallenge()
    const challenge: SerializedChallenge = storageChallenge ?? defaultChallenge('Duba')
    const actor = challenge.scene.type

    const [title, setTitle] = useState(challenge.title)
    const [statement, setStatement] = useState(challenge.statement.description)
    const [clue, setClue] = useState<string | undefined>(challenge.statement.clue)

    // Live-persist as the user types (mirrors TitleEdition / StatementEdition behaviour)
    const persist = (
        nextTitle: string,
        nextStatement: string,
        nextClue: string | undefined
    ) => {
        const ch = LocalStorage.getCreatorChallenge()
        if (!ch) return
        ch.title = nextTitle
        ch.statement.description = nextStatement
        ch.statement.clue = nextClue
        LocalStorage.saveCreatorChallenge(ch)
    }

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
        persist(e.target.value, statement, clue)
    }

    const handleStatementChange = (newStatement: string) => {
        setStatement(newStatement)
        persist(title, newStatement, clue)
    }

    const handleClueChange = (newClue?: string) => {
        setClue(newClue)
        persist(title, statement, newClue)
    }

    return (
        <Stack spacing={2.5}>
            {/* Title */}
            <Stack spacing={0.5}>
                <Typography variant="caption" fontWeight="bold" letterSpacing={1}>
                    {`${t('drawer.info.titleLabel')}${t(`selection.cards.${actor}.name`)}`}
                </Typography>
                <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={title}
                    onChange={handleTitleChange}
                    inputProps={{ maxLength: 38 }}
                />
            </Stack>

            {/* Statement and Clue edition + live preview (same component as StatementEdition.tsx) */}
            <MarkdownEditor
                statement={statement}
                clue={clue}
                setStatement={handleStatementChange}
                setClue={handleClueChange}
            />
        </Stack>
    )
}

// ─── Main Drawer ──────────────────────────────────────────────────────────────

export const ConfigDrawer = ({ open, onClose }: ConfigDrawerProps) => {
    const { t } = useTranslation('creator')
    const { theme } = useThemeContext()
    const [activeTab, setActiveTab] = useState(0)

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue)
    }

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            sx={{
                zIndex: (theme) => theme.zIndex.drawer + 2,
                '& .MuiDrawer-paper': {
                    width: '100%',
                    maxWidth: '100vw',
                    height: '100%',
                    minHeight: '100dvh',
                    maxHeight: '100dvh',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    borderRadius: 0,
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    paddingBottom: 'env(safe-area-inset-bottom)',
                    backgroundColor: theme.palette.background.default,
                },
            }}
            PaperProps={{
                sx: {
                    width: '100%',
                    maxWidth: '100vw',
                    height: '100%',
                    minHeight: '100dvh',
                    maxHeight: '100dvh',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    borderRadius: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    paddingBottom: 'env(safe-area-inset-bottom)',
                    backgroundColor: theme.palette.background.default,
                },
            }}
        >
            {/* ── Header ── */}
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ px: 2, pt: 2, pb: 1 }}
            >
                <Stack direction="row" alignItems="center" spacing={1}>
                    <IconButton onClick={onClose} size="small" aria-label="back" color="inherit">
                        <ArrowBack />
                    </IconButton>
                    <Typography variant="h6" fontWeight="bold">
                        {t('drawer.title')}
                    </Typography>
                </Stack>
                <IconButton onClick={onClose} size="small" aria-label="close" color="inherit">
                    <Close />
                </IconButton>
            </Stack>

            {/* ── Tabs ── */}
            <Tabs
                value={activeTab}
                onChange={handleTabChange}
                variant="fullWidth"
                textColor="primary"
                indicatorColor="primary"
                sx={{
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    '& .MuiTab-root': {
                        fontWeight: 'bold',
                    },
                }}
            >
                <Tab
                    label={t('drawer.tabs.scene')}
                    id="config-tab-0"
                    aria-controls="config-tabpanel-0"
                    sx={{ fontSize: '0.7rem', fontWeight: 'bold', letterSpacing: 0.5 }}
                />
                <Tab
                    label={t('drawer.tabs.blocks')}
                    id="config-tab-1"
                    aria-controls="config-tabpanel-1"
                    sx={{ fontSize: '0.7rem', fontWeight: 'bold', letterSpacing: 0.5 }}
                />
                <Tab
                    label={t('drawer.tabs.info')}
                    id="config-tab-2"
                    aria-controls="config-tabpanel-2"
                    sx={{ fontSize: '0.7rem', fontWeight: 'bold', letterSpacing: 0.5 }}
                />
            </Tabs>

            {/* ── Tab content (scrollable area) ── */}
            <Box sx={{ flex: 1, overflowY: 'auto' }}>
                <TabPanel value={activeTab} index={0}>
                    <SceneTab />
                </TabPanel>
                <TabPanel value={activeTab} index={1}>
                    <BlocksTab />
                </TabPanel>
                <TabPanel value={activeTab} index={2}>
                    <InfoTab />
                </TabPanel>
            </Box>
        </Drawer>
    )
}
