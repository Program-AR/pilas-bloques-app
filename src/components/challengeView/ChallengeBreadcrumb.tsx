import { useMediaQuery, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { PathToChallenge } from "../../staticData/challenges";
import { useThemeContext } from "../../theme/ThemeContext";
import { PBreadcrumbs } from "../PBreadcrumbs";
import HomeIcon from '@mui/icons-material/Home';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { IconButtonTooltip } from "../creator/Editor/SceneEdition/IconButtonTooltip";

export const ChallengeBreadcrumb = (path: PathToChallenge) => {

    const { t } = useTranslation(["books", "challenges", "chapters", "groups", "others"])
    const { theme } = useThemeContext()
    const isSmallScreen: boolean = useMediaQuery('(max-width:1100px)');
    const isVerySmallScreen: boolean = useMediaQuery('(max-width:700px)');
  
    const shouldShowGroup = path.book.id === 1 && !isVerySmallScreen
    const shouldShowChapter = !isSmallScreen
    const hasPrevChallenge = path.group.previousChallenge(path.challenge)
    const hasNextChallenge = path.group.nextChallenge(path.challenge)
  
    return <Stack direction="row" alignItems="center">
      <PBreadcrumbs>
  
        <Link to="/">
          <HomeIcon style={{ display: 'flex', color: '#787878' }} />
  
        </Link>
  
        <Link to={`/libros/${path.book.id}`}>
          <Typography>{t(`${path.book.id}.title`, { ns: "books" })}</Typography>
        </Link>
  
        {shouldShowChapter &&
          <Typography>{t(`${path.chapter.id}.title`, { ns: "chapters" })}</Typography>
        }
  
        {shouldShowGroup &&
          <Typography>{t(`${path.group.id}.title`, { ns: "groups" })}</Typography>
        }
  
        <Typography>{t(`${path.challenge.id}.title`, { ns: "challenges" })}</Typography>
  
      </PBreadcrumbs>
      <Stack marginLeft={theme.spacing(5)} direction='row'>
        {hasPrevChallenge &&
          <Link to={`/desafio/${hasPrevChallenge!.id}`}>
            <IconButtonTooltip icon={<KeyboardDoubleArrowLeftIcon />} tooltip={t('previousChallenge', { ns: "others" })} />
          </Link>
        }
        {hasNextChallenge &&
          <Link to={`/desafio/${hasNextChallenge!.id}`}>
            <IconButtonTooltip icon={<KeyboardDoubleArrowRightIcon />} tooltip={t('nextChallenge', { ns: "others" })} />
          </Link>
        }
      </Stack>
    </Stack>
  }