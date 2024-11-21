import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/Button/Button'

import { Input } from '../../components/Input/Input'

import './Observation.scss'
import { useState } from 'react'

import { IReportMessage } from '../../type'
import { GetProp, Table, TableProps, Tag } from 'antd'
import { SorterResult } from 'antd/es/table/interface'
import { reportsApi } from '../../service/ReportService'
import { TagsChart } from '../../components/TagsChart/TagsChart'
import { PieChart } from '../../components/PieChart/PieChart'
import { LineChart } from '../../components/LineChart/LineChart'
import { BarChart } from '../../components/BarChart/BarChart'
import { CalendarChart } from '../../components/CalendarChart/CalendarChart'


export const Observation: React.FC = () => {
    return (
        <div className='Observation' >
           <CalendarChart/>
        </div>
    )
}

