import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { MarkdownInput } from "./MarkdownInput";
import { MarkdownContext, MarkdownContextType } from "./MarkdownContext";
import { MarkdownResult } from "./MarkdownResult";

export const MarkdownEdition = (props:MarkdownContextType) => {

  const { t } = useTranslation('creator');
  
  return (
    <MarkdownContext.Provider value={props}>
      <Box style={{ justifyContent:'center'}}>
        <Typography variant="body1">{t('statement.descriptionHint')}</Typography>
        <MarkdownResult />
        <MarkdownInput />
      </Box>
    </MarkdownContext.Provider>
  );
}
