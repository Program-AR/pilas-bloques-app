import { Button, IconButton, Menu, MenuItem, useMediaQuery } from "@mui/material"
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from '../../header/header.module.css';
import { LoginModal } from "./LoginModal";
import { LocalStorage } from "../../../localStorage";
import { useThemeContext } from "../../../theme/ThemeContext";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { ForumAccessDialog } from '../../forum/ForumAccessDialog';
import { PilasBloquesApi } from '../../../pbApi';

const AVATAR_COUNT = 16
const AVATAR_PATH = "imagenes/avatars/"

export const avatars = Array.from(Array(AVATAR_COUNT).keys()).map((n) => `${AVATAR_PATH}avatar-${n + 1}.png`)

export const isForumDevEnabled = (): boolean => {
    try {
        const checkParam = (searchStr: string) => {
            const params = new URLSearchParams(searchStr);
            const devForo = params.get('dev_foro') || params.get('foro_dev');
            if (devForo === 'true' || devForo === '1') {
                localStorage.setItem('PB_DEV_FORUM_ENABLED', 'true');
                return true;
            }
            if (devForo === 'false' || devForo === '0') {
                localStorage.removeItem('PB_DEV_FORUM_ENABLED');
                return false;
            }
            return null;
        };

        const fromSearch = checkParam(window.location.search);
        if (fromSearch !== null) return fromSearch;

        const hashIndex = window.location.hash.indexOf('?');
        if (hashIndex !== -1) {
            const fromHash = checkParam(window.location.hash.slice(hashIndex));
            if (fromHash !== null) return fromHash;
        }

        return localStorage.getItem('PB_DEV_FORUM_ENABLED') === 'true' || localStorage.getItem('dev_foro_enabled') === 'true';
    } catch {
        return false;
    }
};

export const SessionButton = () => {

    const { t } = useTranslation('login');

    const [anchorElement, setAnchorElement] = React.useState<null | HTMLElement>(null);
    const [openModal, setOpenModal] = useState(false);
    const [openForumModal, setOpenForumModal] = useState(false);
    const openLoginInMenu = Boolean(anchorElement);

    const { isSmallScreen } = useThemeContext()
    const forumEnabled = isForumDevEnabled();
    
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
                {forumEnabled && (
                    <MenuItem onClick={() => { setOpenForumModal(true); closeMenu() }}>{t('community', { defaultValue: 'Comunidad' })}</MenuItem>
                )}
            </Menu>
        </>
            :
            <Button className={styles['login-btn']} onClick={handleButtonClick}>{isLoggedIn() ? getUser()?.nickName : t('login')}</Button>
        }
        <LoginModal open={openModal} onClose={closeModal} />
        <ForumAccessDialog open={openForumModal} onClose={() => setOpenForumModal(false)} onOpenLogin={() => setOpenModal(true)} />
        {isLoggedIn() ?
            <LoggedInMenu
                setOpenModal={setOpenModal}
                openForumModal={() => setOpenForumModal(true)}
                anchorElement={anchorElement}
                closeMenu={closeMenu} /> : <></>}
    </>
}

type LoggedInMenuProps = {
    anchorElement: null | HTMLElement,
    setOpenModal: (openModal: boolean) => void
    openForumModal: () => void
    closeMenu: () => void
}

const LoggedInMenu = ({ anchorElement, setOpenModal, openForumModal, closeMenu }: LoggedInMenuProps) => {

    const open = Boolean(anchorElement);
    const { t } = useTranslation('login');
    const forumEnabled = isForumDevEnabled();

    const handleLogOut = async () => {
        try {
            await PilasBloquesApi.logout()
        } catch (e) {
            console.error('Error al cerrar sesión en backend:', e)
        } finally {
            LocalStorage.saveUser(null)
            closeMenu()
        }
    }

    const handleChangeUser = () => {
        setOpenModal(true)
        handleLogOut()
    }

    const handleOpenForum = () => {
        closeMenu()
        openForumModal()
    }

    return <Menu
        anchorEl={anchorElement}
        open={open}
        onClose={closeMenu}>
        {forumEnabled && (
            <MenuItem data-testid="communityMenuItem" onClick={handleOpenForum}>{t('community', { defaultValue: 'Comunidad' })}</MenuItem>
        )}
        <MenuItem onClick={handleChangeUser}>{t('changeUser')}</MenuItem>
        <MenuItem onClick={handleLogOut}>{t('logout')}</MenuItem>
    </Menu>
}