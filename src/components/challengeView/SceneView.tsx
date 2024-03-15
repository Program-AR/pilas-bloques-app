import { Challenge } from "../../staticData/challenges"
import { PBCard } from "../PBCard"
import { scene } from "./scene"
import { useMediaQuery } from "@mui/material"
import { useThemeContext } from "../../theme/ThemeContext"
import { useState } from "react"
import { PBProgress } from "../PBProgress"
import { IFrame } from "./IFrame"
import { useScript } from "../../scriptLoader"

type SceneViewProps = {
    descriptor: Challenge["sceneDescriptor"]
    onLoad?: (event: any) => void
}

// It should react and rerender only on changes to the scene descriptor.
export const SceneView = ({ descriptor, onLoad }: SceneViewProps) => {
    const { theme } = useThemeContext()
    const size = useMediaQuery(theme.breakpoints.down('xl')) ? 
            {width: "300px", height: "343px"} :
            {width: "420px", height: "480px"}
    
    const [isLoading, setIsLoading] = useState(true)

    const loadPilasWebScene = async (event: any) => {
        await scene.load(descriptor)
        // Now that both the iframe and the pilasweb scene have been loaded, this component has finished loading.
        setIsLoading(false)
        onLoad && onLoad(event)
    }
    
    return <PBCard>
            {isLoading ? <PBProgress sx={{...size, position:"absolute"}} /> : <></>}
            <IFrame
                style={{border: "inherit", borderRadius: "inherit", ...size}}
                id="sceneIframe"
                data-testid="scene-iframe"
                key={descriptor} // rerenders on descriptor changes
                title='iframePilas'
            >
                <PBScripts onLoad={loadPilasWebScene}/>
                <canvas id="canvas"></canvas>
            </IFrame>
    </PBCard>
}


const PBScripts = ( {onLoad} : {onLoad: (e: any) => {}}) => {
    useScript("libs/pb.js", onLoad)
    return <></>
}