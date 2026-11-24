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
        size={isSmallScreen ? "small" : "medium"}
        sx={{ textTransform: "none",
              margin: isSmallScreen ? '0 2px' : '0 10px',
              padding: isSmallScreen ? '3px 6px' : undefined,
              fontSize: isSmallScreen ? '0.75rem' : undefined,
              minWidth: isSmallScreen ? 0 : undefined,
              whiteSpace: 'nowrap',
              '& .MuiButton-startIcon': isSmallScreen ? {
                marginRight: '3px',
                marginLeft: '-1px',
                '& svg': {
                  fontSize: '1.1rem',
                }
              } : undefined,
              ...props.sx
            }}>
        {t(`editor.buttons.${props.nametag}${!isshortversion && isSmallScreen ? 'Short' : ''}`)}
      </Button >
    </Tooltip>
  )
}

export const StyledCreatorActionButton = (props: CreatorActionButtonProps) => {
  const { isSmallScreen } = useThemeContext()
  const backgroundColor = '#ffb600'

  return <CreatorActionButton
    sx={{
      height: isSmallScreen ? 30 : 45,
      fontSize: isSmallScreen ? '0.75rem' : 18,
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
