import { Stack } from "@mui/material";
import { SizeEditor, StyleGridProps } from "./SizeEditor";
import { PBCard } from "../../../../PBCard";
import { StatementEdition } from "../../ChallengeDetailsEdition/StatementEdition";
import { ToolBoxDialog } from "../../ChallengeDetailsEdition/ToolBoxDialog";
import { ScenarioEditionButtons } from "./ScenarioEditionButtons";

export const GridOptions = (props: StyleGridProps) => {

    return <>
        <Stack sx={{justifyContent: "space-between"}}>
            <PBCard sx={{justifyContent: "center"}}>
                <Stack style={{ height: '100%', margin: '5px' }}>
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