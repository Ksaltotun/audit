

import { IssuesFilter } from '../../containers/IssuesFilter/IssuesFilter'
import { ReportsTable } from '../../containers/ReportsTable/ReportsTable'
import { useAppSelector } from '../../hooks/redux'
import './Issues.scss'


export const Issues: React.FC = () => {
    // const { data: reports, error, isLoading, refetch } = reportsApi.useFetchAllReportsQuery(0)
    const { reports, isLoading } = useAppSelector((state) => state.reportsReducer)
    return (
        <section className='Issues'>
            <h2>Отчеты систем</h2>
            <IssuesFilter {...{ reports: [...reports], isLoading }} />
            <ReportsTable {...{ reports: [...reports], isLoading }} />
        </section>
    )
}

