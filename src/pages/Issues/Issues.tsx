

import { IssuesFilter } from '../../containers/IssuesFilter/IssuesFilter'
import { ReportsTable } from '../../containers/ReportsTable/ReportsTable'
import './Issues.scss'


export const Issues: React.FC = () => {

    return (
        <section className='Issues'>
            <h2>Отчеты систем</h2>
            <IssuesFilter/>
            <ReportsTable/>
            </section>
    )
}

