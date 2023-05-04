import { EmberView } from "./EmberView"
import { Header } from "./header/Header"

export const Register = () =>{
    return <>
    <Header CenterComponent={<></>}/>
    <EmberView path={`register`}/>
    </>
}