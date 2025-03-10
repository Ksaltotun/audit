
import { PingsTable } from '../../containers/PingsTable/PingsTable'
import './Pings.scss'


export const Pings: React.FC = () => {

    return (
        <section className='Pings'>
            <h2>Проверки</h2>
            <PingsTable/>
        </section>
    )
}

