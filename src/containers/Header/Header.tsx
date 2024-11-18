import { useNavigate } from 'react-router-dom'
import './Header.scss'
import { HeaderInfo } from '../HeaderInfo/HeaderInfo'
import { routePage } from '../../redux/reducers/ActionCreators'
import { useAppDispatch } from '../../hooks/redux'

export const Header: React.FC = () => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    return (
        <div className='Header'>
            <HeaderInfo />
            <div className='PageInfo'>

            </div>
            <div className="AuthInfo">
                <span>User_name</span>
                <span>Admin</span>
                <button onClick={() => {
                    dispatch(routePage('/'))
                    navigate('/', { replace: false })
                }}>EXIT</button>
            </div>
        </div>
    )
}

