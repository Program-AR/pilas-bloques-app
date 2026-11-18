import { useState } from "react";
import { Checkbox, Divider, FormControlLabel, Stack, Switch, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { LocalStorage } from "../../../../../localStorage";
import { SerializedChallenge, defaultChallenge } from "../../../../serializedChallenge";
import { GenericModalDialog } from "../../../../modalDialog/GenericModalDialog";
import { PBCard } from "../../../../PBCard";
import { useThemeContext } from "../../../../../theme/ThemeContext";
import { DetailsEditionButton } from "../DetailsEditionButton";
import { RulesPreview } from "./rulesPreview";
import { RuleId, maxProgramLengthOf, ruleGroups, selectedRulesOf, withSelectedRules } from "./rules";

const currentChallenge = (): SerializedChallenge => LocalStorage.getCreatorChallenge() ?? defaultChallenge('Duba')

export const RulesEditor = () => {

    const { t } = useTranslation('creator');
    const { isSmallScreen } = useThemeContext()

    const [open, setOpen] = useState(false);
    const [enabled, setEnabled] = useState(false);
    const [selectedRules, setSelectedRules] = useState<RuleId[]>([]);

    const challenge = currentChallenge()

    const handleButtonClick = () => {
        const rules = selectedRulesOf(currentChallenge().assesments)
        setSelectedRules(rules)
        setEnabled(rules.length > 0)
        setOpen(true)
    }

    const handleOnCancel = () => {
        setOpen(false)
    }

    const handleOnConfirm = () => {
        const challengeToSave = currentChallenge()
        challengeToSave.assesments = withSelectedRules(challengeToSave.assesments, enabled ? selectedRules : [])
        LocalStorage.saveCreatorChallenge(challengeToSave)
        setOpen(false)
    }

    const handleRuleChange = (rule: RuleId, checked: boolean) =>
        setSelectedRules(checked ? [...selectedRules, rule] : selectedRules.filter(selected => selected !== rule))

    return <>
        <DetailsEditionButton
            imageurl="imagenes/selector-bloques.svg"
            text={t('rules.button')}
            onClick={handleButtonClick}
            data-testid="rules-button"
        />
        <GenericModalDialog
            isOpen={open}
            onConfirm={handleOnConfirm}
            onCancel={handleOnCancel}
            title={`${t('rules.title')}${t(`selection.cards.${challenge.scene.type}.name`)}`}
            dialogProps={{ maxWidth: "md", fullWidth: true }}>
            <Stack direction={isSmallScreen ? "column" : "row"} spacing={2} sx={{ paddingTop: 1 }}>
                <PBCard sx={{ padding: 2, flex: 1 }}>
                    <Stack spacing={1}>
                        <FormControlLabel
                            data-testid="rules-switch"
                            labelPlacement="start"
                            sx={{ justifyContent: "space-between", marginLeft: 0 }}
                            control={<Switch checked={enabled} onChange={(_, checked) => setEnabled(checked)} />}
                            label={<Typography variant="subtitle2" fontWeight="bold">{t('rules.enable')}</Typography>}
                        />
                        <Typography variant="caption" color="text.secondary">{t('rules.enableHint')}</Typography>

                        {ruleGroups.map(group =>
                            <Stack key={group.id}>
                                <Divider sx={{ marginY: 1 }} />
                                <Typography variant="subtitle2" fontWeight="bold">{t(`rules.groups.${group.id}`)}</Typography>
                                {group.rules.map(rule =>
                                    <FormControlLabel
                                        key={rule}
                                        data-testid={`rule-${rule}`}
                                        disabled={!enabled}
                                        control={<Checkbox
                                            checked={selectedRules.includes(rule)}
                                            onChange={(_, checked) => handleRuleChange(rule, checked)} />}
                                        label={t(`rules.options.${rule}`)}
                                    />
                                )}
                            </Stack>
                        )}
                    </Stack>
                </PBCard>
                <RulesPreview
                    enabled={enabled}
                    selectedRules={selectedRules}
                    maxProgramLength={maxProgramLengthOf(challenge.assesments)} />
            </Stack>
        </GenericModalDialog>
    </>
}
