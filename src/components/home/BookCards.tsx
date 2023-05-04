import { Stack } from "@mui/material"
import TotoInitial from "../../assets/toto-initial-level.svg"
import TotoIntermediate from "../../assets/toto-intermediate-level.svg"
import TotoAdvanced from "../../assets/toto-advanced-level.svg"
import { LinkCard } from "./HomeCard"

const InitialBookCard = () => <LinkCard url="/libros/1" nameKey="initial" color="#FCE43E" image={TotoInitial}/>
const IntermediateBookCard = () => <LinkCard url="/libros/2" nameKey="intermediate" color="#53BF24" image={TotoIntermediate}/>
const AdvancedBookCard = () => <LinkCard url="/libros/100" nameKey="advanced" color="#32CFC1" image={TotoAdvanced}/>

export const BookCards = () =>
    <Stack direction="row" spacing={10}>
        <InitialBookCard/>
        <IntermediateBookCard/>
        <AdvancedBookCard/>
    </Stack>