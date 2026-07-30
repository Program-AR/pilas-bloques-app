import { Link, useLocation } from "react-router-dom";
import { ChallengeView } from "./challengeView/ChallengeView";
import { Header } from "./header/Header";
import { SerializedChallenge } from "./serializedChallenge";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { PBreadcrumbs } from "./PBreadcrumbs";

export const EMBER_IMPORTED_CHALLENGE_PATH = "desafio/react-imported-challenge"


export const ImportedChallengeView = () => {
    const location = useLocation();
    const importedChallenge: SerializedChallenge | undefined = location.state;

    return <>
        <Header CenterComponent={<ImportedChallengeViewBreadcrumb importedChallenge={importedChallenge} />} />
        <ChallengeView path={EMBER_IMPORTED_CHALLENGE_PATH} serializedChallenge={importedChallenge} />
    </>
}

const ImportedChallengeViewBreadcrumb = ({ importedChallenge }: { importedChallenge: SerializedChallenge | undefined }) => {

    const { t } = useTranslation("creator")

    if (!importedChallenge) throw new Error("No hay desafio importado :(")

    return <PBreadcrumbs>
        <Link to="/" style={{ textDecoration: 'none' }}>
            <Typography>{t("importedChallengedHeader")}</Typography>
        </Link>

        <Typography>{importedChallenge.title}</Typography>

    </PBreadcrumbs>
}