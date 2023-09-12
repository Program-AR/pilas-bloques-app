import { Link, useLocation } from "react-router-dom";
import { EmberView } from "./emberView/EmberView";
import { Header } from "./header/Header";
import { SerializedChallenge } from "./serializedChallenge";
import { Typography } from "@mui/material";
import { useThemeContext } from "../theme/ThemeContext";
import { useTranslation } from "react-i18next";
import { PBreadcrumbs } from "./PBreadcrumbs";

export const EMBER_IMPORTED_CHALLENGE_PATH = "desafio/react-imported-challenge"


export const ImportedChallengeView = () => {

    return <>
        <Header CenterComponent={<ImportedChallengeViewBreadcrumb />} />
        <EmberView path={EMBER_IMPORTED_CHALLENGE_PATH} />
    </>
}

const ImportedChallengeViewBreadcrumb = () => {

    const { theme } = useThemeContext()
    const { t } = useTranslation(["books", "challenges", "chapters", "groups"])

    const location = useLocation();
    const importedChallenge: SerializedChallenge | undefined = location.state;

    if (!importedChallenge) throw new Error("No hay desafio importado :(")


    return <PBreadcrumbs>
        <Link to="/" style={{ textDecoration: 'none' }}>
            <Typography>Desafío creado por la comuinidad</Typography>
        </Link>

        <Typography>{importedChallenge.title}</Typography>

    </PBreadcrumbs>
}