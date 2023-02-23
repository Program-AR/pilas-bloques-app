import {IconButton, Menu, MenuItem} from "@mui/material";
import LanguageIcon from '@mui/icons-material/Language';
import React from "react";
import i18next from "i18next";
import { availableLanguages, InternalizationLanguage } from "../../i18n";

export const ChangeLanguageButton = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleIconClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const closeMenu = () => {
        setAnchorEl(null);
    }

    const handleLanguageSelection = (selectedLanguage: InternalizationLanguage) => {
        i18next.changeLanguage(selectedLanguage.localeCode)
        closeMenu()
    };
    
    return <>
    <IconButton onClick={handleIconClick}>
        <LanguageIcon/>
    </IconButton>

    <Menu
        anchorEl={anchorEl}
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


