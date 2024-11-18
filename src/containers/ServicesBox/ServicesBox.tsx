import './ServicesBox.scss'

import { ServiceStatus } from '../../components/ServiceStatus/ServiceStatus'

export const ServicesBox: React.FC = () => {
    const possibleStatus = [200, 400, 500]
    const statuses  =  []
    for (let i = 0; i < 20; i++){
        statuses.push(possibleStatus[Math.floor(Math.random() * 3)])               
    }
    return (
        <div className='ServicesBox' >
            {
                statuses.map(dataStatus=><ServiceStatus {...{dataStatus}} />)
            }
            
        </div>
    )
}

