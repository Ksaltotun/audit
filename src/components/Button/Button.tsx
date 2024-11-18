import { useNavigate } from 'react-router-dom'

import './Button.scss'
import { IButtonProps } from '../../type'
import { useAppDispatch } from '../../hooks/redux'
import { routePage } from '../../redux/reducers/ActionCreators'

export const Button: React.FC<IButtonProps> = (props: IButtonProps) => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    return (
        <div className='Button' onClick={()=>{
            dispatch(routePage('admin'))
            navigate(props.routeTo ?? '/')
        }} data-type={props.type}>
            <span>{props.text}</span>
        </div>
    )
}
