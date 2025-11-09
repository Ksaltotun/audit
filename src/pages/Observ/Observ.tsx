

import { useEffect, useState } from 'react'
import { Observation } from '../../containers/Observation/Observation'
import { ReportsTable } from '../../containers/ReportsTable/ReportsTable'
import './Observ.scss'


export const Observ: React.FC = () => {
    return (
        <section className='Observ'  style={{maxWidth: '96vw'}}>
            <h2>Обзор поступления рапортов от систем</h2>
            <Observation />
        </section>
    )
}

