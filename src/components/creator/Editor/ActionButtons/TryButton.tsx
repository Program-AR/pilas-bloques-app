import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { CreatorActionButton } from "./CreatorActionButton"
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

export const TryButton = () => {
    const {t} = useTranslation('creator')

    return <Link to="/creador/probar">
            <CreatorActionButton startIcon={<PlayArrowIcon/>} backgroundcolor="#449d99">{t("editor.buttons.try")}</CreatorActionButton>
        </Link>

}