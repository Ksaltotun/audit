import { useNavigate } from 'react-router-dom'
import { ResponsiveBar } from '@nivo/bar'
import { ResponsiveCalendar, ResponsiveCalendarCanvas } from '@nivo/calendar'
import { MONTHS } from '../../utils'
import './CalendarChart.scss'
import { reportsApi } from '../../service/ReportService'



export const CalendarChart: React.FC = () => {
  const { data: reports, error, isLoading, refetch } = reportsApi.useFetchAllReportsQuery(0)
    const perDay = new Map<string, any>()
   //const timeFormat: Intl.DateTimeFormatOptions = {year: 'numeric', month: 'numeric', day: '2-digit'}
  const data:any = []

   reports?.forEach(report=>{
      const date = new Date(report.dateApp).toISOString().slice(0, 10)
      if(perDay.get(date)) {
        perDay.set(date, perDay.get(date) + 1)
      } else {
        perDay.set(date, 1)
      }
   })

   perDay.forEach((v, k)=>{
    data.push({
      value: v,
      day: k
     })
   })
   console.log(perDay)
    return (
        <ResponsiveCalendarCanvas
        data={data}
        from="2024-01-01"
        to="2024-12-31"
        emptyColor="#eeeeee"
        colors={[ '#61cdbb', '#97e3d5', '#e8c1a0', '#f47560' ]}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        yearSpacing={40}
        align='top'
        minValue={-1}
        monthLegend={(y, m, date)=>MONTHS[m]}
        monthBorderColor="#ffffff"
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
       
    />
    )
}
