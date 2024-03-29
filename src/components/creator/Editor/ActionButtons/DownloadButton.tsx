import { SerializedChallenge } from "../../../serializedChallenge";
import { LocalStorage } from "../../../../localStorage";
import { CreatorActionButton } from "./CreatorActionButton";
import DownloadIcon from '@mui/icons-material/Download';

export const DownloadButton = () => {
    
    return <CreatorActionButton onClick={downloadChallenge} startIcon={<DownloadIcon/>} nametag='download'/>

}

const downloadChallenge = () => {
    const challenge: SerializedChallenge = LocalStorage.getCreatorChallenge()!
  
    const blob = new Blob([JSON.stringify(challenge)], { type: 'application/json' });
  
    const temporaryAnchorElement = document.createElement('a')
    
    const urlObject = URL.createObjectURL(blob)
  
    temporaryAnchorElement.href = urlObject
  
    const challengeName: string = challenge.title ? challenge.title : "pilas-bloques"
  
    temporaryAnchorElement.download = `${challengeName}.dpbq`
  
    temporaryAnchorElement.click();
  
    // Clean up the resource
    URL.revokeObjectURL(urlObject);
  
}