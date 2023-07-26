import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { CreatorActionButton } from "./CreatorActionButton";

export const NewChallengeButton = () => {
    const {t} = useTranslation('creator')

    return <Link to="/creador/seleccionar"><CreatorActionButton>{t("editor.buttons.newChallenge")}</CreatorActionButton></Link>

}

