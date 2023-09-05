import { Stack } from "@mui/material";
import { SizeEditor, StyleGridProps } from "./SizeEditor";
import { PBCard } from "../../../../PBCard";
import { StatementEdition } from "../../ChallengeDetailsEdition/StatementEdition";
import { ToolBoxEditor } from "../../ChallengeDetailsEdition/ToolBoxEditor/ToolBoxEditor";
import { ScenarioEditionButtons } from "./ScenarioEditionButtons";
import { useThemeContext } from "../../../../../theme/ThemeContext";

export const GridOptions = (props: StyleGridProps) => {
    const { theme } = useThemeContext()


    return <>
        <Stack>
            <PBCard sx={{justifyContent: "center"}}>
                <Stack sx={{padding: theme.spacing(1)}}>
                    <SizeEditor setStyleGrid={props.setStyleGrid} />
                    <ScenarioEditionButtons/>
                </Stack>
            </PBCard>
            <StatementEdition />
            <ToolBoxEditor/>
            {/*<Button>Bloques iniciales</Button> Not in the MVP*/}
        </Stack>
    </>
}