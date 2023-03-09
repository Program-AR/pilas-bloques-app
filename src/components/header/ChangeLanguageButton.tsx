import {IconButton, Menu, MenuItem} from "@mui/material";
import LanguageIcon from '@mui/icons-material/Language';
import React, { useContext } from "react";
import { availableLanguages, changeLanguage, InternalizationLanguage } from "../../language";
import { AppContext } from "../../AppContext";

export const ChangeLanguageButton = () => {
    const [anchorElement, setAnchorElement] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorElement);

    const { setLanguage } = useContext(AppContext)

    const handleIconClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElement(event.currentTarget);
    };

    const closeMenu = () => {
        setAnchorElement(null);
    }

    const handleLanguageSelection = (selectedLanguage: InternalizationLanguage) => {
      changeLanguage(selectedLanguage) //This changes the language in react
      setLanguage(selectedLanguage.languageCode) //This changes the language in the App Context, so that the iframe re renders with the new language
      closeMenu()
    };
    
    return <>
    <IconButton onClick={handleIconClick}>
        <LanguageIcon sx={{ color: 'GrayText'}}/>
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


