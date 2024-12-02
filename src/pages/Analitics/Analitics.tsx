import { Spinner } from '../../components/Spinner/Spinner'
import { AnaliticsCharts } from '../../containers/AnaliticsCharts/AnaliticsCharts'
import { useAppSelector } from '../../hooks/redux'
import { reportsApi } from '../../service/ReportService'
import './Analitics.scss'


export const Analitics: React.FC = () => {
    //const { data: reports, error, isLoading, refetch } = reportsApi.useFetchAllReportsQuery(0)
    const { reports, isLoading } = useAppSelector((state) => state.reportsReducer)
    return (
        isLoading ? <Spinner /> :
            <section className='Analitics'>
                <h2>Аналитика</h2>
                {
                    <AnaliticsCharts props={reports || []} />

                }

            </section>
    )
}

