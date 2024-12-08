import { useNavigate } from 'react-router-dom'
import { ResponsiveBar } from '@nivo/bar'
import { ResponsiveCalendar, ResponsiveCalendarCanvas } from '@nivo/calendar'
import { MONTHS } from '../../utils'
import './CalendarChart.scss'
import { reportsApi } from '../../service/ReportService'
import { useAppSelector } from '../../hooks/redux'
import { useEffect } from 'react'



export const CalendarChart: React.FC = () => {
  //const { data: reports, error, isLoading, refetch } = reportsApi.useFetchAllReportsQuery(0)
  const { reports } = useAppSelector((state) => state.reportsReducer)
  const perDay = new Map<string, any>()
  //const timeFormat: Intl.DateTimeFormatOptions = {year: 'numeric', month: 'numeric', day: '2-digit'}
  const data: any = []

  useEffect(() => {
    setTimeout(() => {
      const rects = document.querySelectorAll('g rect')
      function makeText(x: string, y: string, width: string, height: string, text: string) {
        const SVG_NS = "http://www.w3.org/2000/svg"
        const textNode = document.createElementNS(SVG_NS, "text")
        textNode.setAttributeNS(null, 'x', '' + (+x + (+width / 3)))
        textNode.setAttributeNS(null, 'y', '' + (+y + (+height / 1.5)))
        textNode.setAttributeNS(null, 'font-size', '12')
        textNode.textContent = text

        return textNode
      }

      const getDatesArray = (start: Date, end: Date) => {
        const arr = [];
        while (start <= end) {
          arr.push((new Date(start)).getDate());
          start.setDate(start.getDate() + 1);
        }
        return arr;
      };

      const datas = getDatesArray(new Date('2024-01-01'), new Date('2024-12-31'))
      const gElement = document.querySelector('.Observation g')

      rects.forEach((item: any, ind: number) => {
        let x: string = item['x']['animVal']['value']
        let y: string = item['y']['animVal']['value']
        let width: string = item['width']['animVal']['value']
        let height: string = item['height']['animVal']['value']
        console.dir(item)
        gElement?.appendChild(makeText(x, y, width, height, datas[ind] + ''))
      })
    }, 10)
  }, [])

  reports?.forEach(report => {
    const date = new Date(report.dateApp).toISOString().slice(0, 10)
    if (perDay.get(date)) {
      perDay.set(date, perDay.get(date) + 1)
    } else {
      perDay.set(date, 1)
    }
  })

  perDay.forEach((v, k) => {
    data.push({
      value: v,
      day: k
    })
  })
  return (
    <ResponsiveCalendar
      data={data}
      from="2024-01-01"
      to="2024-12-31"
      emptyColor="#eeeeee"
      colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
      margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
      yearSpacing={40}
      align='top'
      minValue={-1}
      monthLegend={(y, m, date) => MONTHS[m]}
      monthBorderColor="#000"
      monthBorderWidth={2}
      dayBorderWidth={2}
      dayBorderColor="#ffffff"
      monthSpacing={4}

    />
  )
}
