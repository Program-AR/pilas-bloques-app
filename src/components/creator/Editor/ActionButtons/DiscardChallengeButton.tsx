import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { CreatorActionButton } from "./CreatorActionButton";
import ClearIcon from '@mui/icons-material/Clear';

export const DiscardChallengeButton = () => {
    const {t} = useTranslation('creator')

    return <Link to="/creador/seleccionar">
            <CreatorActionButton startIcon={<ClearIcon/>} backgroundcolor="#9d4444">{t("editor.buttons.discardChallenge")}</CreatorActionButton>
        </Link>

}

