import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/Button/Button'

import { Input } from '../../components/Input/Input'

import './AnaliticsCharts.scss'
import { useState } from 'react'

import { IReportMessage } from '../../type'

import { PieChart } from '../../components/PieChart/PieChart'
import { LineChart } from '../../components/LineChart/LineChart'
import { BarChart } from '../../components/BarChart/BarChart'
import { MONTHS } from '../../utils'

interface IProps {
    props: IReportMessage[]
}

export const AnaliticsCharts: React.FC<IProps> = ({ props }: IProps) => {

console.log(props)
    const perSystems = new Map()
    const perYear = new Map()

    props.forEach(rep => {
        const name = rep.appInfo.appName
        if (perSystems.has(name)) {
            perSystems.set(name,
                {
                    num: perSystems.get(name).num + 1,
                    security: rep.event === 'security' ? perSystems.get(name).security + 1 : perSystems.get(name).security,
                    systemError: rep.event === 'systemError' ? perSystems.get(name).systemError + 1 : perSystems.get(name).systemError,
                    systemAction: rep.event === 'systemAction' ? perSystems.get(name).systemAction + 1 : perSystems.get(name).systemAction,
                    userAction: rep.event === 'userAction' ? perSystems.get(name).userAction + 1 : perSystems.get(name).userAction
                })

        } else {
            perSystems.set(name,
                {
                    num: 1,
                    security: rep.event === 'security' ? 1 : 0,
                    systemError: rep.event === 'systemError' ? 1 : 0,
                    systemAction: rep.event === 'systemAction' ? 1 : 0,
                    userAction: rep.event === 'userAction' ? 1 : 0
                })
        }
        
        const dateY = (new Date(rep.dateApp)).getFullYear() + ''
        const dateM = (new Date(rep.dateApp)).getMonth()
        console.log(rep.idEvent, dateY)
        if (perYear.has(dateY)){
           const pp = perYear.get(dateY)
           pp[dateM] = {[MONTHS[dateM]]:pp[dateM][MONTHS[dateM]] += 1}
          
            perYear.set(dateY, [...pp])
        } else {
            perYear.set(dateY, MONTHS.map(item=>({[item]:0})))
        }
    })

    return (
        <div className='AnaliticsCharts' >
            <div className="div1">
                
                <LineChart props={perYear}/>

            </div>
            <div className="div2">
              <h5>Распределение репортов по системам</h5>
                <PieChart props={perSystems}  />

            </div>
            <div className="div3">

                <BarChart props={perSystems} />
            </div>

        </div>
    )
}

