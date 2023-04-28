import { useSearchParams } from "react-router-dom";
import { EmberView } from "./EmberView"
import { Header } from "./header/Header"

export const PasswordRecovery = () =>{
    const [searchParams] = useSearchParams();
    const token: string | null = searchParams.get("token")

    const tokenParam: string = token ? `?token=${token}` : ""
    
    return <>
    <Header/>
    <EmberView path={`password-recovery${tokenParam}`}/>
    </>
}