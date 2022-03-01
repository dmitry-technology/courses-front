import TwitterIcon from '@mui/icons-material/Twitter';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import FacebookIcon from '@mui/icons-material/Facebook';
import { ReactNode } from 'react';

export type AuthType = {
    name: string;
    icon: ReactNode;
}


export const providerAuth: AuthType[] = [
    {name:"google", icon:<GTranslateIcon fontSize="large" color="info" />},
    {name:"twitter", icon:<TwitterIcon fontSize="large" color="info"  />},
    {name:"facebook", icon:<FacebookIcon fontSize="large" color="info" />}
]