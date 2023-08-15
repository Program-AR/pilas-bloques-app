import { Stack } from "@mui/material";
import { SizeEditor, StyleGridProps } from "./SizeEditor";
import { PBCard } from "../../../../PBCard";
import { StatementEdition } from "../../ChallengeDetailsEdition/StatementEdition";
import { ToolBoxDialog } from "../../ChallengeDetailsEdition/ToolBoxDialog";
import { ScenarioEditionButtons } from "./ScenarioEditionButtons";
import theme from "../../../../../theme";

export const GridOptions = (props: StyleGridProps) => {

    return <>
        <Stack>
            <PBCard sx={{justifyContent: "center"}}>
                <Stack sx={{padding: theme.spacing(1)}}>
                    <SizeEditor setStyleGrid={props.setStyleGrid} />
                    <ScenarioEditionButtons/>
                </Stack>
            </PBCard>
            <StatementEdition />
            <ToolBoxDialog/>
            {/*<Button>Bloques iniciales</Button> Not in the MVP*/}
        </Stack>
    </>
}