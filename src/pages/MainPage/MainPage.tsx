

import { useEffect } from 'react'

import './MainPage.scss'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { Footer } from '../../containers/Footer/Footer'
import { Header } from '../../containers/Header/Header'
import { AdminPage } from '../AdminPage/AdminPage'
import { Outlet, useNavigate } from 'react-router-dom'
import { NavButton } from '../../components/NavButton/NavButton'
import { IReportMessage, IUser } from '../../type'
import { reportsApi } from '../../service/ReportService'



export const MainPage: React.FC = () => {

    const dispatch = useAppDispatch()
    //const { data: posts, error, isLoading, refetch } = reportsApi.useFetchAllReportsQuery(0)

    // const handdleCreate = async () => {
    //     const title = prompt('vvedite')
    //     await createPost({ title, body: title } as IPost)
    // }

    return (
        <section className='MainPage'>
            <header className='headMenuBox'>
                <Header />
            </header>
            <aside className='leftMenuBox'>
                <NavButton type='login' text={'Админка'} routeTo={'admin'} />
                <NavButton type='login' text={'Проблемы'} routeTo={'issues'} />
                <NavButton type='login' text={'Схема'} routeTo={'schema'} />
            </aside>
            <section className='contentBox'>
                <Outlet />
            </section>
            <footer className='footerBox'>
                <Footer />
            </footer>
        </section>
    )
}

