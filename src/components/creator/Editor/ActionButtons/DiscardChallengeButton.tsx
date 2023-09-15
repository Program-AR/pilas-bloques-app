import { Link } from "react-router-dom";
import { CreatorActionButton } from "./CreatorActionButton";
import ClearIcon from '@mui/icons-material/Clear';

export const DiscardChallengeButton = () => {

    return <Link to="/creador/seleccionar">
            <CreatorActionButton startIcon={<ClearIcon/>} nametag='discardChallenge'/>
        </Link>

}

