import { FC } from 'react'
import { useMediaQuery } from 'react-responsive'
import { RouteType } from '../../models/common/route-type'
import NavigatorDrawer from './navigator-mobile'
import NavigatorWeb from './navigator-web'

const NavigatorResposive: FC<{ items: RouteType[] }> = (props) => {
    const isMobileOrLaptop = useMediaQuery({ query: '(min-width: 900px)' })
    return isMobileOrLaptop ? <NavigatorWeb items={props.items} /> :
            <NavigatorDrawer items={props.items} />

}

export default NavigatorResposive
