import { Alert, Box, Divider, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { PBCard } from "../../../../PBCard";
import { RuleId, allRules } from "./rules";

type RulesPreviewProps = {
    enabled: boolean
    selectedRules: RuleId[]
    maxProgramLength: number
}

export const RulesPreview = ({ enabled, selectedRules, maxProgramLength }: RulesPreviewProps) => {
    const { t } = useTranslation('creator');

    const rulesToShow = allRules.filter(rule => selectedRules.includes(rule))

    return <PBCard sx={{ padding: 2, flex: 1 }}>
        <Stack spacing={1.5}>
            <Typography variant="subtitle2" fontWeight="bold">{t('rules.preview.title')}</Typography>
            <Divider />

            {!enabled &&
                <Typography variant="body2" data-testid="rules-preview-disabled">{t('rules.preview.disabled')}</Typography>}

            {enabled && rulesToShow.length === 0 &&
                <Typography variant="body2" data-testid="rules-preview-empty">{t('rules.preview.empty')}</Typography>}

            {enabled && rulesToShow.length > 0 && <>
                <Typography variant="body2" fontWeight="bold">{t('rules.preview.intro')}</Typography>
                <Box component="ul" sx={{ margin: 0, paddingLeft: 3 }}>
                    {rulesToShow.map(rule =>
                        <Typography component="li" variant="body2" key={rule} data-testid={`rule-preview-${rule}`}>
                            {t(`rules.preview.${rule}`, { limit: maxProgramLength })}
                        </Typography>
                    )}
                </Box>
            </>}

            <Alert severity="info" sx={{ marginTop: 2 }}>{t('rules.hint')}</Alert>
        </Stack>
    </PBCard>
}
