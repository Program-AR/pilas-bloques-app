import { SerializedChallenge } from "../../../serializedChallenge";
import { LocalStorage } from "../../../../localStorage";
import { CreatorActionButton } from "./CreatorActionButton";
import DownloadIcon from '@mui/icons-material/Download';
import { PilasBloquesApi } from "../../../../pbApi";

export const ShareButton = () => {
    
    return <CreatorActionButton onClick={shareChallenge} startIcon={<DownloadIcon/>} nametag='share' isshortversion={true}/>

}

const shareChallenge = async () => {
    const challenge: SerializedChallenge = LocalStorage.getCreatorChallenge()!
   
    await PilasBloquesApi.shareChallenge(challenge)
  
}