import { Card, CardActionArea, Stack, Typography } from "@mui/material"
import {ReactComponent as TotoInitial} from "../../assets/toto-initial-level.svg"
import {ReactComponent as TotoIntermediate} from "../../assets/toto-intermediate-level.svg"
import {ReactComponent as TotoAdvanced} from "../../assets/toto-advanced-level.svg"
import { Link } from "react-router-dom";

const InitialBookCard = () => <Link to="desafio/1">
    <Card>
        <CardActionArea>
            <TotoInitial/>
            <Typography variant="h5">Inicial</Typography>
        </CardActionArea>
    </Card>
</Link>

const IntermediateBookCard = () => <Link to="desafio/2">
    <Card>
        <CardActionArea>
            <TotoIntermediate/>
            <Typography variant="h5">Intermedio</Typography>
        </CardActionArea>
    </Card>
</Link>

const AdvancedBookCard = () => <Link to="desafio/3">
    <Card>
        <CardActionArea>
            <TotoAdvanced/>
            <Typography variant="h5">Avanzado</Typography>
        </CardActionArea>
    </Card>
</Link>

export const BookCards = () =>
    <Stack direction="row" spacing={10}>
        <InitialBookCard/>
        <IntermediateBookCard/>
        <AdvancedBookCard/>
    </Stack>