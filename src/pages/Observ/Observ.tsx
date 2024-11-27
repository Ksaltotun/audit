

import { Observation } from '../../containers/Observation/Observation'
import { ReportsTable } from '../../containers/ReportsTable/ReportsTable'
import './Observ.scss'


export const Observ: React.FC = () => {

    return (
        <section className='Observ'>
            <h2>Обзор поступления рапортов от систем</h2>
            <Observation />
        </section>
    )
}

