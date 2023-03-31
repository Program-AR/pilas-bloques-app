import { Button, Menu, MenuItem } from "@mui/material"
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from '../header.module.css';
import { LoginModal } from "./LoginModal";

const AVATAR_COUNT = 16
const AVATAR_PATH = "imagenes/avatars/"


export const SessionButton = () => {

    const { t } = useTranslation("header");

    const [anchorElement, setAnchorElement] = React.useState<null | HTMLElement>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const open = Boolean(anchorElement);

    const handleButtonClick = (event: React.MouseEvent<HTMLElement>) => {
        if(!isLoggedIn) setOpenModal(true)
        //setAnchorElement(event.currentTarget);
    };

    const closeMenu = () => {
        setAnchorElement(null);
    }

    const closeModal = () => {
        setOpenModal(false)
    }

    const avatars = Array.from(Array(AVATAR_COUNT).keys()).map((n) => `${AVATAR_PATH}avatar-${n + 1}.png`)

    const getRandomAvatar = () =>  avatars[Math.floor(Math.random() * avatars.length)]


    return <div>
        <img className={`${styles.face} ${!isLoggedIn ? styles.gray : ''}`} src={!isLoggedIn ? getRandomAvatar() : AVATAR_PATH + 'avatar-1.png'}/>
        <Button className={styles.loginBtn} onClick={handleButtonClick}>{t('login')}</Button>

        <LoginModal open={openModal} onClose={closeModal}/>
        {isLoggedIn ? (<Menu
                anchorEl={anchorElement}
                open={open}
                onClose={closeMenu}>
                    <MenuItem>{t('changeUser')}</MenuItem>
                    <MenuItem>{t('logout')}</MenuItem>
                </Menu>) : <></>
        }
    </div>   
}