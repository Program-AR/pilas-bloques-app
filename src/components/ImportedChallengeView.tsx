import { Link, useLocation } from "react-router-dom";
import { ChallengeView } from "./challengeView/ChallengeView";
import { Header } from "./header/Header";
import { SerializedChallenge } from "./serializedChallenge";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { PBreadcrumbs } from "./PBreadcrumbs";

export const EMBER_IMPORTED_CHALLENGE_PATH = "desafio/react-imported-challenge"


export const ImportedChallengeView = () => {

    return <>
        <Header CenterComponent={<ImportedChallengeViewBreadcrumb />} />
        <ChallengeView height='calc(100% - var(--creator-subheader-height))' path={EMBER_IMPORTED_CHALLENGE_PATH} />
    </>
}

const ImportedChallengeViewBreadcrumb = () => {

    const { t } = useTranslation("creator")

    const location = useLocation();
    const importedChallenge: SerializedChallenge | undefined = location.state;

    if (!importedChallenge) throw new Error("No hay desafio importado :(")

    return <PBreadcrumbs>
        <Link to="/" style={{ textDecoration: 'none' }}>
            <Typography>{t("importedChallengedHeader")}</Typography>
        </Link>

        <Typography>{importedChallenge.title}</Typography>

    </PBreadcrumbs>
}