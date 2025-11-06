import { useNavigate } from 'react-router-dom'
import './Header.scss'
import { HeaderInfo } from '../HeaderInfo/HeaderInfo'
import { routePage } from '../../redux/reducers/ActionCreators'
import { useAppDispatch } from '../../hooks/redux'
import { Button } from '../../components/Button/Button'

export const Header: React.FC = () => {


    return (
        <div className='Header'>
            <HeaderInfo />
            <div className='PageInfo'>

            </div>
            <div className="AuthInfo">

                {/* <span>Admin</span> */}

                <Button type={'navigate'} text={'Выход'} />
            </div>
        </div>
    )
}

