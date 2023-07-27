import { useContext } from 'react';
import { Stack, Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { LocalStorage } from '../../../../localStorage';
import { SerializedChallenge, sceneObjectByType } from '../../../serializedChallenge';
import { CreatorContext } from '../CreatorContext';

export const SceneTools = () => {
    type ToolProps = {
        id: string
        image?: string
    }
    
    const { t } = useTranslation('creator');
    const {selectedTool, setSelectedTool} = useContext(CreatorContext)

    const challenge: SerializedChallenge | null = LocalStorage.getCreatorChallenge()

    const selectTool = (e: React.MouseEvent<HTMLElement>) => {
        setSelectedTool(e.currentTarget.id)
    }

    const imagePath = 'imagenes/sceneImages'
    const imagePathScene = `${imagePath}/${challenge?.scene.type}`

    const Tool = (props: ToolProps) => 
        <Button variant="outlined" 
                id={props.id}
                data-testid={props.id}
                onClick={selectTool}
                style={{backgroundImage: `url("${props.image}")`, 
                        backgroundSize: "contain", backgroundRepeat: "no-repeat",
                        backgroundPositionX: "center",
                        backgroundPositionY: "center",
                        boxShadow: `0 0px calc(10px * ${Number(props.id===selectedTool)})`,
                        borderRadius: "2",  width:"50px", height:"50px"}}/>
    

    const PutObstacleTool = () => 
        <>
            <Tool id="O" image={`${imagePathScene}/O.png`} /> 
            <Typography variant="caption">{t('tools.putObstacle')}</Typography>
        </>

    const PutObjectTool = () => 
        <>
            <Stack direction="row" style={{flexWrap: "wrap", justifyContent: "center"}}>
                {sceneObjectByType(challenge!.scene.type).validCells.map((object) => 
                <Tool id={object} key={object} image={`${imagePathScene}/${object}.png`}/>)}
            </Stack>
            <Typography variant="caption">{t('tools.putObject')}</Typography>
        </>

    const PutActorTool = () => 
        <>
            <Tool id="A" image={`${imagePathScene}/tool.png`}/>
            <Typography variant="caption">{t('tools.putActor')}</Typography>
        </>
                        
    const DeleteTool = () => 
        <>
            <Tool id="-" image={`${imagePath}/eraser.png`}/>
            <Typography variant="caption">{t('tools.delete')}</Typography>
        </>     


    return ( 
        <Stack alignItems="center" style={{maxWidth: "200px", padding: "10px"}}>
            <PutActorTool/>
            <PutObstacleTool/>
            <PutObjectTool/>
            <DeleteTool/>
        </Stack> 
    )
}
