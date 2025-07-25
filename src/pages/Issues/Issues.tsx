

import { useEffect } from 'react'
import { IssuesFilter } from '../../containers/IssuesFilter/IssuesFilter'
import { ReportsTable } from '../../containers/ReportsTable/ReportsTable'
import { useAppSelector } from '../../hooks/redux'
import './Issues.scss'
import { useAppDispatch } from '../../hooks/redux'
import { setLoading, setReports } from '../../redux/reducers/ActionCreators'
import { reportsApi } from '../../service/ReportService'


export const Issues: React.FC = () => {
    //const { data: reports, error, isLoading, refetch } = reportsApi.useFetchAllReportsQuery(0)
    
    return (
        <section className='Issues'>
            <h2>Отчеты систем</h2>
            <IssuesFilter/>
            <ReportsTable/>
        </section>
    )
}

