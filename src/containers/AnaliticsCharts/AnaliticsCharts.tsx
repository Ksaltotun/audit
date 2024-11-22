import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/Button/Button'

import { Input } from '../../components/Input/Input'

import './AnaliticsCharts.scss'
import { useState } from 'react'

import { IReportMessage } from '../../type'
import { GetProp, Table, TableProps, Tag } from 'antd'
import { SorterResult } from 'antd/es/table/interface'
import { reportsApi } from '../../service/ReportService'
import { TagsChart } from '../../components/TagsChart/TagsChart'
import { PieChart } from '../../components/PieChart/PieChart'
import { LineChart } from '../../components/LineChart/LineChart'
import { BarChart } from '../../components/BarChart/BarChart'

interface IProps {
    props: IReportMessage[]
}

export const AnaliticsCharts: React.FC<IProps> = ({props}:IProps) => {
    console.log(props)

    const perSystems = new Map()


    props.forEach(rep=>{
        const name = rep.appInfo.appName
        if (perSystems.has(name)) {
            perSystems.set(name, perSystems.get(name) + 1)
        } else {
            perSystems.set(name, 1)
        }
    })

    console.log(perSystems)

    // {
    //     "id": "scala",
    //     "label": "scala",
    //     "value": 422,
    //     "color": "hsl(3, 70%, 50%)"
    //   },
    return (
        <div className='AnaliticsCharts' >
            <div className="div1">
            <TagsChart /> </div>
            <div className="div2"> 
            <PieChart props={perSystems}/>
            </div>
            <div className="div3"> 
                <LineChart/>
            </div>
            <div className="div4"> 
                <BarChart/>
            </div>
        </div>
    )
}

