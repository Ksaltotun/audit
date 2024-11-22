import { ResponsiveStream } from '@nivo/stream'
import { reportsApi } from '../../service/ReportService'
import './TagsChart.scss'


export const TagsChart = (props) => {
 const appNames = []

   const data = [
    {
      "Raoul": 86,
      "Josiane": 130,
      "Marcel": 156,
      "René": 69,
      "Paul": 93,
      "Jacques": 97
    },
    {
      "Raoul": 57,
      "Josiane": 165,
      "Marcel": 178,
      "René": 153,
      "Paul": 177,
      "Jacques": 141
    },
    {
      "Raoul": 18,
      "Josiane": 145,
      "Marcel": 27,
      "René": 87,
      "Paul": 121,
      "Jacques": 49
    },
    {
      "Raoul": 135,
      "Josiane": 92,
      "Marcel": 131,
      "René": 68,
      "Paul": 142,
      "Jacques": 120
    },
    {
      "Raoul": 159,
      "Josiane": 163,
      "Marcel": 178,
      "René": 198,
      "Paul": 13,
      "Jacques": 143
    },
    {
      "Raoul": 92,
      "Josiane": 66,
      "Marcel": 186,
      "René": 136,
      "Paul": 191,
      "Jacques": 92
    },
    {
      "Raoul": 129,
      "Josiane": 85,
      "Marcel": 90,
      "René": 14,
      "Paul": 66,
      "Jacques": 88
    },
    {
      "Raoul": 195,
      "Josiane": 92,
      "Marcel": 178,
      "René": 147,
      "Paul": 93,
      "Jacques": 140
    },
    {
      "Raoul": 67,
      "Josiane": 61,
      "Marcel": 127,
      "René": 146,
      "Paul": 169,
      "Jacques": 108
    }
  ]
    return (
        <div className='TagsChart'>
            <ResponsiveStream
        data={data}
        keys={[
            'Raoul',
            'Josiane',
            'Marcel',
            'René',
            'Paul',
            'Jacques'
        ]}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendOffset: 36,
            truncateTickAt: 0
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendOffset: -40,
            truncateTickAt: 0
        }}
        enableGridX={true}
        enableGridY={true}
        offsetType="expand"
        colors={{ scheme: 'paired' }}
        fillOpacity={1}
         legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                translateX: 100,
                itemWidth: 80,
                itemHeight: 20,
                itemTextColor: '#999999',
                symbolSize: 12,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000000'
                        }
                    }
                ]
            }
        ]}
    />

        </div>
    )
}
