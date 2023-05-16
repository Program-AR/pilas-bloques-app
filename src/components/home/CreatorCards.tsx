import { Stack } from "@mui/material"
import { LinkCard } from "./HomeCard"
import { ImportChallengeCard } from "./ImportChallengeCard"
import CreatorImage from "../../assets/placeholder.png"
import styles from './home.module.css';

const CreateChallengeCard = () => <LinkCard url="/creador/seleccionar" nameKey="creator" color="#ec3efc" image={CreatorImage}/>

export const CreatorCards = () =>
    <Stack direction='row' className={styles['home-container']}>
        <CreateChallengeCard/>
        <ImportChallengeCard/>
    </Stack>