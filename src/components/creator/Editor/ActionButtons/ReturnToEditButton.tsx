import { Link } from "react-router-dom";
import { StyledCreatorActionButton } from "./CreatorActionButton";
import EditIcon from '@mui/icons-material/Edit';

export const ReturnToEditionButton = () => {

    return <Link to="/creador/editar" style={{textDecoration: "none"}}>
        <StyledCreatorActionButton startIcon={<EditIcon />} nametag='keepEditing' />
    </Link>

}