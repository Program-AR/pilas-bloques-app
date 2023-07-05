import { useState } from 'react';
import { Stack, Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { LocalStorage } from '../../localStorage';
import { SerializedChallenge, sceneObjects } from '../serializedChallenge';

export const SceneTools = () => {
    type ToolProps = {
        id: string
        image?: string
    }
    
    const { t } = useTranslation('creator');
    const [selectedTool, setSelectedTool] = useState('')

    const challenge: SerializedChallenge | null = LocalStorage.getCreatorChallenge()

    const selectTool = (e: React.MouseEvent<HTMLElement>) => {
       setSelectedTool(e.currentTarget.id as any)
    }

    const Tool = (props: ToolProps) => 
        <Button variant="outlined" 
                id={props.id}
                onClick={selectTool}
                style={{backgroundImage: `url("${props.image}")`, 
                        backgroundSize: "contain", backgroundRepeat: "no-repeat",
                        backgroundPositionX: "center",
                        backgroundPositionY: "center",
                        boxShadow: `0 0px calc(10px * ${Number(props.id===selectedTool)})`,
                        borderRadius: "2",  width:"50px", height:"50px"}}/>
    
    const PutObstacleTool = () => 
        <>
           <Typography variant="caption">{t('tools.putObstacle')}</Typography>
            <Tool id="O" image={`imagenes/sceneImages/${challenge?.scene.type}/O.png`} /> 
        </>

    const PutObjectTool = () => 
        <>
            <Typography variant="caption">{t('tools.putObject')}</Typography>
            <Stack direction="row" style={{flexWrap: "wrap", justifyContent: "center"}}>
                {sceneObjects(challenge!.scene.type).map((object) => 
                <Tool id={object} image={`imagenes/sceneImages/${challenge?.scene.type}/${object}.png`}/>)}
            </Stack>
        </>

    const PutActorTool = () => 
        <>
            <Typography variant="caption">{t('tools.putActor')}</Typography>
            <Tool id="A" image={`imagenes/sceneImages/${challenge?.scene.type}/A.png`}/>
        </>
                        
    const DeleteTool = () => 
        <>
            <Typography variant="caption">{t('tools.delete')}</Typography>
            <Tool id="e" image={`imagenes/sceneImages/eraser.png`}/>
        </>     


    return ( 
        <Stack alignItems="center" style={{padding: "10px"}}>
            <PutObstacleTool/>
            <PutObjectTool/>
            <PutActorTool/>
            <DeleteTool/>
        </Stack> 
    )
}

