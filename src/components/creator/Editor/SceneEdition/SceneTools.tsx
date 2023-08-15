import { useContext } from 'react';
import { Stack, Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { LocalStorage } from '../../../../localStorage';
import { SerializedChallenge, sceneObjectByType } from '../../../serializedChallenge';
import { CreatorContext } from '../CreatorContext';
import { PBCard } from '../../../PBCard';
import theme from '../../../../theme';

export const SceneTools = () => {
    type ToolProps = {
        id: string
        image?: string
    }

    const { t } = useTranslation('creator');
    const { selectedTool, setSelectedTool } = useContext(CreatorContext)

    const challenge: SerializedChallenge | null = LocalStorage.getCreatorChallenge()

    const selectTool = (e: React.MouseEvent<HTMLElement>) => {
        setSelectedTool(e.currentTarget.id)
    }

    const imagePath = 'imagenes/sceneImages'
    const imagePathScene = `${imagePath}/${challenge?.scene.type}`


    const Tool = (props: ToolProps) => {

        return <Button variant='outlined'
            id={props.id}
            data-testid={props.id}
            onClick={selectTool}
            style={{
                backgroundImage: `url("${props.image}")`,
                backgroundSize: "contain", backgroundRepeat: "no-repeat",
                backgroundPositionX: "center",
                backgroundPositionY: "center",
                boxShadow: `0 0px calc(10px * ${Number(props.id === selectedTool)})`,
                height:'40px',
                marginTop: theme.spacing(0.5)
    }
} />
    }

type ToolGroupProps = {
    children: React.ReactNode
    type: string
}

const ToolGroup = (props: ToolGroupProps) =>
    <Stack alignItems="center" sx={{ marginY: theme.spacing(0.5) }}>
        {props.children}
        <Typography sx={{ textAlign: 'center', marginTop: theme.spacing(0.5) }} variant="subtitle2">{t(`tools.${props.type}`)}</Typography>
    </Stack>

const PutObstacleTool = () =>
    <ToolGroup type='putObstacle'>
        <Tool id="O" image={`${imagePathScene}/O.png`} />
    </ToolGroup>

const PutObjectTool = () =>
    <ToolGroup type='putObject'>
        {sceneObjectByType(challenge!.scene.type).validCells.map((object) =>
            <Tool id={object} key={object} image={`${imagePathScene}/${object}.png`} />)}
    </ToolGroup>

const PutActorTool = () =>
    <ToolGroup type='putActor'>
        <Tool id="A" image={`${imagePathScene}/tool.png`} />
    </ToolGroup>

const DeleteTool = () =>
    <ToolGroup type='delete'>
        <Tool id="-" image={`${imagePath}/eraser.png`} />
    </ToolGroup>

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


