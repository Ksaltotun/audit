import { useNavigate } from 'react-router-dom'
import { ResponsiveBarCanvas } from '@nivo/bar'
import './BarChart.scss'

interface IProps {
  props: Map<string, any>
}

export const BarChart: React.FC<IProps> = ({props}:IProps) => {
   const data: any= []

  props.forEach(({security, systemError, systemAction, userAction}, k)=>{
    data.push({
      "system": k,
      security,
      systemError,
      systemAction,
      userAction
    })
  })
    return (
        <ResponsiveBarCanvas
        data={data}
        keys={[
            'security',
            'systemError',
            'systemAction',
            'userAction',
          ]}
        
        indexBy="system"
        margin={{ top: 50, right: 90, bottom: 50, left: 10 }}
        pixelRatio={1.25}
        padding={0.15}
        innerPadding={0}
        minValue="auto"
        maxValue="auto"
        groupMode="grouped"
        layout="vertical"
        reverse={false}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colorBy="id"
        borderWidth={0}
        borderRadius={0}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        axisTop={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendOffset: 36,
            truncateTickAt: 0
        }}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Распределение тегов по системам',
            legendPosition: 'middle',
            legendOffset: 36,
            truncateTickAt: 0
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'food',
            legendPosition: 'middle',
            legendOffset: -40,
            truncateTickAt: 0
        }}
        enableGridX={true}
        enableGridY={false}
        enableLabel={true}
        enableTotals={false}
        totalsOffset={10}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        labelPosition="middle"
        labelOffset={0}
        isInteractive={true}
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'top-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemWidth: 120,
                itemHeight: 20,
                itemsSpacing: 2,
                symbolSize: 20,
                itemDirection: 'left-to-right'
            }
        ]}
    />
    )
}
