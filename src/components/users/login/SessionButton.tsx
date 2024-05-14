import { Button, IconButton, Menu, MenuItem, useMediaQuery } from "@mui/material"
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from '../../header/header.module.css';
import { LoginModal } from "./LoginModal";
import { LocalStorage } from "../../../localStorage";
import { useThemeContext } from "../../../theme/ThemeContext";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const AVATAR_COUNT = 16
const AVATAR_PATH = "imagenes/avatars/"

export const avatars = Array.from(Array(AVATAR_COUNT).keys()).map((n) => `${AVATAR_PATH}avatar-${n + 1}.png`)

export const SessionButton = () => {

    const { t } = useTranslation('login');

    const [anchorElement, setAnchorElement] = React.useState<null | HTMLElement>(null);
    const [openModal, setOpenModal] = useState(false);
    const openLoginInMenu = Boolean(anchorElement);

    const { isSmallScreen } = useThemeContext()
    
    const handleButtonClick = (event: React.MouseEvent<HTMLElement>) => {
        if (isLoggedIn() || isSmallScreen) {
            setAnchorElement(event.currentTarget);
        } else {
            setOpenModal(true)
        }
    }

    const isLoggedIn = () => !!getUser()

    const closeModal = () => {
        setOpenModal(false)
    }

    const closeMenu = () => {
        setAnchorElement(null);
    }

    const getUser = () => LocalStorage.getUser()

    const getRandomAvatar = () => avatars[Math.floor(Math.random() * avatars.length)]

    return <>
        <img alt='profile-avatar' className={`${styles['face']} ${!isLoggedIn() ? styles.gray : ''}`} src={!isLoggedIn() ? getRandomAvatar() : getUser()?.avatarURL} />
        {isSmallScreen ? <>
            <IconButton onClick={handleButtonClick}>
                <ArrowDropDownIcon color="primary" />
            </IconButton>
            <Menu
                open={openLoginInMenu}
                anchorEl={anchorElement}
                onClose={() => closeMenu()}>
                <MenuItem onClick={() => { setOpenModal(true); closeMenu() }}>{t('login')}</MenuItem>
            </Menu>
        </>
            :
            <Button className={styles['login-btn']} onClick={handleButtonClick}>{isLoggedIn() ? getUser()?.nickName : t('login')}</Button>
        }
        <LoginModal open={openModal} onClose={closeModal} />
        {isLoggedIn() ?
            <LoggedInMenu
                setOpenModal={setOpenModal}
                anchorElement={anchorElement}
                closeMenu={closeMenu} /> : <></>}
    </>
}

type LoggedInMenuProps = {
    anchorElement: null | HTMLElement,
    setOpenModal: (openModal: boolean) => void
    closeMenu: () => void
}

const LoggedInMenu = ({ anchorElement, setOpenModal, closeMenu }: LoggedInMenuProps) => {

    const open = Boolean(anchorElement);
    const { t } = useTranslation('login');

    const handleLogOut = () => {
        LocalStorage.saveUser(null)
        closeMenu()
    }

    const handleChangeUser = () => {
        setOpenModal(true)
        handleLogOut()
    }

    return <Menu
        anchorEl={anchorElement}
        open={open}
        onClose={closeMenu}>
        <MenuItem onClick={handleChangeUser}>{t('changeUser')}</MenuItem>
        <MenuItem onClick={handleLogOut}>{t('logout')}</MenuItem>
    </Menu>
}