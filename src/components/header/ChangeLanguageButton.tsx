import {IconButton, Menu, MenuItem} from "@mui/material";
import LanguageIcon from '@mui/icons-material/Language';
import React from "react";
import { availableLanguages, changeLanguage, InternalizationLanguage } from "../../language";
import ReactGA from "react-ga4";

export const ChangeLanguageButton = () => {
    const [anchorElement, setAnchorElement] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorElement);

    const handleIconClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElement(event.currentTarget);
    };

    const closeMenu = () => {
        setAnchorElement(null);
    }

    const handleLanguageSelection = (selectedLanguage: InternalizationLanguage) => {
      ReactGA.event({
          category: "localization",
          action: "language_changed",
          label: selectedLanguage.languageCode
      });
      changeLanguage(selectedLanguage)
      closeMenu()
    };
    
    return <>
    <IconButton onClick={handleIconClick}>
        <LanguageIcon color="primary"/>
    </IconButton>

    <Menu
        anchorEl={anchorElement}
        open={open}
        onClose={closeMenu}
      >
        {availableLanguages.map((language: InternalizationLanguage) => (
          <MenuItem key={language.name} onClick={() => handleLanguageSelection(language)}>
            {language.name}
          </MenuItem>
        ))}
      </Menu>
    </>
}


