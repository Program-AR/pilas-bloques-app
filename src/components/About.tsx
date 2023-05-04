import { EmberView } from "./EmberView"
import { Header } from "./header/Header"

export const About = () =>{
    return <>
    <Header CenterComponent={<></>}/>
    <EmberView path={`acercade`}/>
    </>
}