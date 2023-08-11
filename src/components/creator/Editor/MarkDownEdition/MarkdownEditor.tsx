import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { MarkdownInput } from "./MarkdownInput";
import { MarkdownContext, MarkdownContextType } from "./MarkdownContext";
import { MarkdownResult } from "./MarkdownResult";
import theme from "../../../../theme";

export const MarkdownEdition = (props:MarkdownContextType) => {

  const { t } = useTranslation('creator');
  
  return (
    <MarkdownContext.Provider value={props}>
        <MarkdownResult />
        <Typography variant="body1" marginY={theme.spacing(2)}>{t('statement.descriptionHint')}</Typography>
        <MarkdownInput />
    </MarkdownContext.Provider>
  );
}
