import { Challenge } from "../../staticData/challenges"
import { PBCard } from "../PBCard"

type SceneProps = { descriptor: Challenge["scene"] }

// It should react and rerender only on changes to the scene descriptor.
export const Scene = ({ descriptor }: SceneProps) => {
    return <PBCard sx={{width: "400px"}}>
        {descriptor}
        <iframe title='iframePilas' src='pilas.html' />
    </PBCard>
}