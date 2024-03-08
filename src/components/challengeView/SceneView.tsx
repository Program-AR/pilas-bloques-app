import { Challenge } from "../../staticData/challenges"
import { PBCard } from "../PBCard"
import { scene } from "./scene"
import { useMediaQuery } from "@mui/material"
import { useThemeContext } from "../../theme/ThemeContext"
import { useState } from "react"
import { PBProgress } from "../PBProgress"

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

    console.log("you little bugger URL: " + window.location.href)
    const loadPilasWebScene = async (event: any) => {
        await scene.load(descriptor)
        // Now that both the iframe and the pilasweb scene have been loaded, this component has finished loading.
        setIsLoading(false)
        onLoad && onLoad(event)
    }
    
    return <PBCard>
            {isLoading ? <PBProgress /> : <></>}
            <iframe
                style={{border: "inherit", borderRadius: "inherit", ...size}}
                id="sceneIframe"
                data-testid="scene-iframe"
                key={descriptor} // rerenders on descriptor changes
                title='iframePilas'
                src={`${process.env.PUBLIC_URL}/pilas.html`}
                onLoad={loadPilasWebScene}/>
    </PBCard>
}

