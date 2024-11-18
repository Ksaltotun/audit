import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/Button/Button'

import { Input } from '../../components/Input/Input'

import './LoginForm.scss'
import { useState } from 'react'


export const LoginForm: React.FC = () => {

    const navigate = useNavigate()
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className='LoginForm' >
            <div className='DataBlock'>
                <div className='TitleBlock'>
                    <span>
                        Войти в систему
                    </span>
                </div>
                <div className='InputBlock'>
                    <Input type='text' placeholder='Email/Телефон' changeFunction={setUserName} />
                    <Input type='password' placeholder='Пароль' changeFunction={setPassword} />
                </div>
                <div className='ButtonBlock'>
                    <Button type='login' text={'Войти'} routeTo={'main'} />

                </div>
            </div>
        </div>
    )
}

