import TwitterIcon from '@mui/icons-material/Twitter';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import FacebookIcon from '@mui/icons-material/Facebook';
import { ReactNode } from 'react';

type authType = {
    name: string;
    icon: ReactNode;
}


export const getProviderAuth: authType[] = [
    {name:"google", icon:<GTranslateIcon fontSize="large" color="info" />},
    {name:"twitter", icon:<TwitterIcon fontSize="large" color="info"  />},
    {name:"facebook", icon:<FacebookIcon fontSize="large" color="info" />}
]