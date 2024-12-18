import { IPagesNames, RoutesType } from '../../type';
import './NavIcon.scss'

export const NavIcon: React.FC<RoutesType> = (props: RoutesType) => {

    return (<svg
        viewBox="0 0 24 24"
        fill="currentColor"
        height="24px"
        width="24px"
    >
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M12 14v8H4a8 8 0 018-8zm0-1c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm9 4h1v5h-8v-5h1v-1a3 3 0 016 0v1zm-2 0v-1a1 1 0 00-2 0v1h2z" />
    </svg>);
}
