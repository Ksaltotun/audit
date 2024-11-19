import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/Button/Button'

import { Input } from '../../components/Input/Input'

import './AnaliticsCharts.scss'
import { useState } from 'react'

import { IReportMessage } from '../../type'
import { GetProp, Table, TableProps, Tag } from 'antd'
import { SorterResult } from 'antd/es/table/interface'
import { reportsApi } from '../../service/ReportService'


export const AnaliticsCharts: React.FC = () => {
    return (
        <div className='AnaliticsCharts' >
            <div className="div1"> </div>
            <div className="div2"> </div>
            <div className="div3"> </div>
            <div className="div4"> </div>
        </div>
    )
}

