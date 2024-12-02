
import { ServicesBox } from '../../containers/ServicesBox/ServicesBox'
import { ShchemaGraph } from '../../containers/ShchemaGraph/ShchemaGraph'
import './Schema.scss'


export const Schema: React.FC = () => {

    return (
        <section className='Schema'>
            <h2>Схема систем КИС</h2>
            <ShchemaGraph />
            {/* <ServicesBox/> */}
            </section>
    )
}

