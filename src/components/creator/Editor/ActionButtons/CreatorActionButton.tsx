import { Button, ButtonProps, darken, Tooltip, useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../../../../theme/ThemeContext";

type CreatorActionButtonProps = {
  nametag: string,
  isshortversion?: boolean
} & ButtonProps

export const CreatorActionButton = ({ isshortversion = false, ...props }: CreatorActionButtonProps) => {
  const { isSmallScreen } = useThemeContext()

  const { t } = useTranslation('creator')

  return (
    <Tooltip title={isSmallScreen ? t(`editor.buttons.${props.nametag}`) : ''}>
      <Button {...props} variant="outlined" 
        sx={{ textTransform: "none",
              margin: '0 10px',
              whiteSpace: 'nowrap',
              ...props.sx
            }}>
        {t(`editor.buttons.${props.nametag}${!isshortversion && isSmallScreen ? 'Short' : ''}`)}
      </Button >
    </Tooltip>
  )
}

export const StyledCreatorActionButton = (props: CreatorActionButtonProps) => {
  const backgroundColor = '#ffb600'

  return <CreatorActionButton
    sx={{
      height: 45,
      fontSize: 18,
      color: 'white',
      fontWeight: 'bold',
      border: 0,
      backgroundColor: backgroundColor,
      '&:hover': {
        backgroundColor: darken(backgroundColor, 0.2),
        border: 0,
      },
      ...props.sx
    }}
    {...props}>
    {props.children}
  </CreatorActionButton>
}
