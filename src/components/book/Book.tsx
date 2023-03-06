import { Card } from "@mui/material";
import { Link } from "react-router-dom";
import TotoInitial from "../../assets/toto-initial-level.svg"

export const Book = () => {

    return <Link to="/desafio/1" replace><Card style={{maxWidth: "20%"}}><img src={TotoInitial}></img></Card></Link>
}