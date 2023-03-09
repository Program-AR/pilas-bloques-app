import { useContext } from "react";
import { AppContext } from "../AppContext";

export const ChallengeView = () => {
    const context = useContext(AppContext)

    return <iframe key={JSON.stringify(context)} id="ember-iframe" title='challenge' src='emberPB/index.html' width='100%' height='99%'/>
}