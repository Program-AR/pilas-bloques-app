import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const NewChallengeButton = () => {
    const {t} = useTranslation('creator')

    return <Link to="/creador/seleccionar"><Button>{t("editor.buttons.newChallenge")}</Button></Link>

}

