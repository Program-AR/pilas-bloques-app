import { Challenge } from "../../staticData/challenges"
import { PBCard } from "../PBCard"
import { scene } from "./scene"
import { useMediaQuery } from "@mui/material"
import { useThemeContext } from "../../theme/ThemeContext"

type SceneViewProps = { descriptor: Challenge["sceneDescriptor"] }

// It should react and rerender only on changes to the scene descriptor.
export const SceneView = ({ descriptor }: SceneViewProps) => {
    const { theme } = useThemeContext()
    const size = useMediaQuery(theme.breakpoints.down('xl')) ? 
            {width: "300px", height: "343px"} :
            {width: "420px", height: "480px"}
    return <PBCard>
        <iframe 
            style={{border: "inherit", borderRadius: "inherit", ...size}}
            id="sceneIframe"
            key={descriptor} // rerenders on descriptor changes
            title='iframePilas'
            src='pilas.html'
            onLoad={() => scene.load(descriptor)}/>
    </PBCard>
}

