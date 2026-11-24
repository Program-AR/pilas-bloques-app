import { Stack } from "@mui/material";
import { useThemeContext } from "../../../../theme/ThemeContext";

export const CreatorSubHeader = ({ children }: { children: React.ReactNode }) => {
    const { theme, isSmallScreen } = useThemeContext()

    return <Stack
        direction='row'
        height='var(--creator-subheader-height)'
        justifyContent='center'
        sx={{
            backgroundColor: theme.palette.background.paper,
            zIndex: 1,
            width: '100%',
            maxWidth: '100vw',
            overflowX: 'hidden',
            px: isSmallScreen ? 0.5 : 0,
            flexShrink: 0,
        }}
    >
        <Stack
            direction='row'
            width='100%'
            alignItems='center'
            justifyContent={isSmallScreen ? 'space-between' : 'space-between'}
            maxWidth={isSmallScreen ? '100%' : 'var(--creator-max-width)'}
            sx={{
                gap: isSmallScreen ? 0.5 : 1,
            }}
        >
            {children}
        </Stack>
    </Stack>
}
