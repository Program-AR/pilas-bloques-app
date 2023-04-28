import { Stack } from "@mui/material"
import TotoInitial from "../../assets/toto-initial-level.svg"
import TotoIntermediate from "../../assets/toto-intermediate-level.svg"
import TotoAdvanced from "../../assets/toto-advanced-level.svg"
import { Link } from "react-router-dom";
import { HomeCard, HomeCardProps } from "./HomeCard";

type HomeLinkCardProps = {url: string} & HomeCardProps

export const HomeLinkCard = (props: HomeLinkCardProps) =>
    <Link to={props.url} style={{ textDecoration: 'none' }}>
        {HomeCard(props)}
    </Link>

const InitialBookCard = () => <HomeLinkCard url="/libros/1" nameKey="initial" color="#FCE43E" image={TotoInitial}/>
const IntermediateBookCard = () => <HomeLinkCard url="/libros/2" nameKey="intermediate" color="#53BF24" image={TotoIntermediate}/>
const AdvancedBookCard = () => <HomeLinkCard url="/libros/100" nameKey="advanced" color="#32CFC1" image={TotoAdvanced}/>

export const BookCards = () =>
    <Stack direction="row" spacing={10}>
        <InitialBookCard/>
        <IntermediateBookCard/>
        <AdvancedBookCard/>
    </Stack>