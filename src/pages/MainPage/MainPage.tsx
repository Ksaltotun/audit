

import { useEffect } from 'react'

import './MainPage.scss'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { Footer } from '../../containers/Footer/Footer'
import { Header } from '../../containers/Header/Header'
import { AdminPage } from '../AdminPage/AdminPage'
import { Outlet, useNavigate } from 'react-router-dom'
import { NavButton } from '../../components/NavButton/NavButton'
import { ModalWindow } from '../../components/ModalWindow/ModalWindow'
import data from '../../db.json'
import { setLoading, setPings, setReports } from '../../redux/reducers/ActionCreators'



export const MainPage: React.FC = () => {

    const dispatch = useAppDispatch()
    const {reports} = useAppSelector((state) => state.reportsReducer)
    
    useEffect(()=>{
        setTimeout(()=>{
            const datas:any[] = data.reportMessages
            const pings:any[] = data.systemsPing
            dispatch(setLoading(false))
            dispatch(setReports(datas))
            dispatch(setPings(pings))
        }, 10)
        setTimeout(()=>{dispatch(setLoading(true))}, 0)
    }, [])
    return (
        <>
        <ModalWindow/>
        <section className='MainPage'>
        <header className='headMenuBox'>
            <Header />
        </header>
        <aside className='leftMenuBox'>
            {/* <NavButton type='login' text={'Админка'} routeTo={'admin'} /> */}
            <NavButton type='login' text={'Обзор'} routeTo={'observe'} />
            <NavButton type='login' text={'Аналитика'} routeTo={'analitics'} />
            <NavButton type='login' text={'Отчеты'} routeTo={'issues'} />
            <NavButton type='login' text={'Проверки'} routeTo={'pings'} />
            {/* {<NavButton type='login' text={'Схема'} routeTo={'schema'} />} */}
        </aside>
        <section className='contentBox'>
            <Outlet />
        </section>
                {/* <footer className='footerBox'>
                    <Footer />
                </footer> */}
    </section></>
        
    )
}

