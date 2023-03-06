import {IconButton, Menu, MenuItem} from "@mui/material";
import LanguageIcon from '@mui/icons-material/Language';
import React from "react";
import { common } from '@mui/material/colors';
import { availableLanguages, changeLanguage, InternalizationLanguage } from "../../language";

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
      changeLanguage(selectedLanguage)
      closeMenu()
    };
    
    return <>
    <IconButton onClick={handleIconClick}>
        <LanguageIcon style={{ color: common.white }}/>
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


