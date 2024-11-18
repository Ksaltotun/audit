import { useNavigate } from 'react-router-dom'

import './NavButton.scss'
import { IButtonProps } from '../../type'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { routePage } from '../../redux/reducers/ActionCreators'
import { NavIcon } from '../NavIcon/NavIcon'

export const NavButton: React.FC<IButtonProps> = (props: IButtonProps) => {

    const navigate = useNavigate()
    const { name, isPageLoading } = useAppSelector((state) => state.leftMenuReducer)
    const dispatch = useAppDispatch()

    return (
        <div className='NavButton' data-active={name === props.routeTo ? 'active' : '4'} onClick={() => {

            dispatch(routePage(props.routeTo ?? '/'))

            navigate(props.routeTo ?? '/')
        }}>
            <div className='NavBox'>
            <span>{props.text}</span>
            </div>
            

        </div>
    )
}
