import { Button, Menu, MenuItem } from "@mui/material"
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from '../header.module.css';
import { LoginModal } from "./LoginModal";
import { PB_USER, PilasBloquesApi } from "../../../pbApi";
import { Ember } from "../../../emberCommunication";

const AVATAR_COUNT = 16
const AVATAR_PATH = "imagenes/avatars/"


export const SessionButton = () => {

    const { t } = useTranslation('login');

    const [anchorElement, setAnchorElement] = React.useState<null | HTMLElement>(null);
    const [openModal, setOpenModal] = useState(false);
    const open = Boolean(anchorElement);

    const handleButtonClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElement(event.currentTarget);
        if(!isLoggedIn()) setOpenModal(true)
    }

    const handleChangeUser = () => {
        setOpenModal(true)
        handleLogOut()
    }

    const handleLogOut = () => {
        localStorage.removeItem(PB_USER)
        closeMenu()
    }

    const isLoggedIn = () => Boolean(localStorage.getItem(PB_USER));

    const closeMenu = () => {
        setAnchorElement(null);
    }

    const closeModal = () => {
        setOpenModal(false)
    }

    const getNickname = () => PilasBloquesApi.getUser()?.nickName

    const avatars = Array.from(Array(AVATAR_COUNT).keys()).map((n) => `${AVATAR_PATH}avatar-${n + 1}.png`)

    const getRandomAvatar = () =>  avatars[Math.floor(Math.random() * avatars.length)]


    return <div>
        <img className={`${styles.face} ${!isLoggedIn() ? styles.gray : ''}`} src={!isLoggedIn() ? getRandomAvatar() : AVATAR_PATH + 'avatar-1.png'}/>
        <Button className={styles.loginBtn} onClick={handleButtonClick}>{isLoggedIn() ? getNickname() : t('login')}</Button>

        <LoginModal open={openModal} onClose={closeModal} />
        {isLoggedIn() ? (<Menu
                anchorEl={anchorElement}
                open={open}
                onClose={closeMenu}>
                    <MenuItem onClick={handleChangeUser}>{t('changeUser')}</MenuItem>
                    <MenuItem onClick={handleLogOut}>{t('logout')}</MenuItem>
                </Menu>) : <></>
        }
    </div>   
}