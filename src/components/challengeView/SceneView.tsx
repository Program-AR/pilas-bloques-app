import { Challenge } from "../../staticData/challenges"
import { PBCard } from "../PBCard"
import { scene } from "./scene"

type SceneViewProps = { descriptor: Challenge["scene"] }

// It should react and rerender only on changes to the scene descriptor.
export const SceneView = ({ descriptor }: SceneViewProps) => {
    return <PBCard sx={{width: "420px", height: "480px"}}>
        <iframe 
            id="sceneIframe"
            title='iframePilas'
            src='pilas.html'
            onLoad={() => scene.load(descriptor)}/>
    </PBCard>
}