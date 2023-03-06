import { Stack, Grid, Typography, Link } from "@mui/material";
import {ReactComponent as FooterLogos} from "../../assets/footer-logos.svg"

const Version = () => 
    <div>Versión 1.2.3 - pepita</div>

const Links = () =>{
    const termsAndConditionsLink = "https://docs.google.com/document/u/1/d/e/2PACX-1vTNX9zl8txZmuINNz2qODrodoQhvr0o2-r3T_6yFp6quEpidmPz6ORx1HSjo2KNUg6MnyHPN-Ti44z1/pub"
    
    return <>
        <Link href="acercade">Acerca de Pilas Bloques</Link> |
        <Link href="docentes"> Ir al sitio para docentes</Link> |
        <Link href={termsAndConditionsLink}> Términos y condiciones</Link>
    </>
}

export const Footer = () => 
    <Stack direction="row" justifyContent={"center"} spacing={12}>

        <Grid> 
            <Typography fontSize={"14px"}>
                <Version/>
                <Links/>
            </Typography>
        </Grid>

        <FooterLogos width={"30%"}/>

    </Stack>