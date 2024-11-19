import { AnaliticsCharts } from '../../containers/AnaliticsCharts/AnaliticsCharts'
import './Analitics.scss'


export const Analitics: React.FC = () => {

    return (
        <section className='Analitics'>
            <h2>Аналитика</h2>
            <AnaliticsCharts />
        </section>
    )
}

