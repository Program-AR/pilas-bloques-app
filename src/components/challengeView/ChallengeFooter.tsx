import { Button, Stack } from "@mui/material"
import { PBCard } from "../PBCard"
import { Link } from "react-router-dom"
import { Version } from "../footer/Footer"
import InfoIcon from '@mui/icons-material/Info';
import HelpIcon from '@mui/icons-material/Help';
import styles from "./challengeFooter.module.css"


export const ChallengeFooter = () => {

    const PROGRAMAR_LINK = 'https://program.ar/'

    return <PBCard className={styles.card}>
        <Stack direction={'row'} width={'100%'} alignItems='center' justifyContent={'space-between'}>
            <Stack direction={'row'} gap={2} >
                <Link to={PROGRAMAR_LINK} style={{ display: 'flex' }}>
                    <img src="imagenes/programar-short.png" style={{ alignSelf: 'center', maxWidth: "100%", height: '1.25rem' }} alt="logos" />
                </Link>
                <Version />
            </Stack>
            <Stack direction={'row'} gap={2}>
                <Button size="small" startIcon={<HelpIcon />}><b>¿ALGUN PROBLEMA CON ESTE EJERCICIO?</b></Button>
                <Button size="small" startIcon={<InfoIcon />}><b>ACERCA DE</b></Button>
            </Stack>
        </Stack>
    </PBCard>
}