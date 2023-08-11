import { Link } from "react-router-dom";
import { StyledCreatorActionButton } from "./CreatorActionButton";
import EditIcon from '@mui/icons-material/Edit';

export const ReturnToEditionButtion = () => {

    return <Link to="/creador/editar">
        <StyledCreatorActionButton startIcon={<EditIcon />} nametag='keepEditing' />
    </Link>

}