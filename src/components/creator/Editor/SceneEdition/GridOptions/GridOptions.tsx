import { Stack } from "@mui/material";
import { SizeEditor, StyleGridProps } from "./SizeEditor";
import { PBCard } from "../../../../PBCard";
import { StatementEdition } from "../../ChallengeDetailsEdition/StatementEdition";
import { TitleEdition } from "../../ChallengeDetailsEdition/TitleEdition";
import { ScenarioEditionButtons } from "./ScenarioEditionButtons";
import { useThemeContext } from "../../../../../theme/ThemeContext";
import { ToolBoxEditor } from "../../ChallengeDetailsEdition/ToolBoxEditor/ToolBoxEditor";

export const GridOptions = (props: StyleGridProps) => {
    const { theme } = useThemeContext()


    return <>
        <Stack>
            <PBCard sx={{justifyContent: "center"}}>
                <Stack sx={{padding: theme.spacing(1), maxWidth: "200px", paddingBottom: 5, paddingTop: 4}}>
                    <SizeEditor setStyleGrid={props.setStyleGrid} />
                    <ScenarioEditionButtons/>
                </Stack>
            </PBCard>
                <Stack direction='row'>
                    <TitleEdition />
                    <StatementEdition />
                </Stack>
                <ToolBoxEditor/>
            {/*<Button>Bloques iniciales</Button> Not in the MVP*/}
        </Stack>
    </>
}