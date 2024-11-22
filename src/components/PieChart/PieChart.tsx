import { ResponsivePie } from '@nivo/pie'

import './PieChart.scss'
import { SYSTEMS_COLOR_SETTINGS } from '../../utils'

interface IProps {
  props: Map<string, number>
}

export const PieChart: React.FC<IProps> = ({props}: IProps) => {

    
   const data: any[] = []

  props.forEach((v, k)=>{
    data.push({
      "id": k,
      "label": SYSTEMS_COLOR_SETTINGS.get(k).label,
      "value": v,
      "color": SYSTEMS_COLOR_SETTINGS.get(k).color
    })
  })
    return (
      <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{
          from: 'color',
          modifiers: [
              [
                  'darker',
                  0.2
              ]
          ]
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: 'color' }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
          from: 'color',
          modifiers: [
              [
                  'darker',
                  2
              ]
          ]
      }}
       legends={[
          {
              anchor: 'right',
              direction: 'column',
              justify: false,
              translateX: 0,
              translateY: 56,
              itemsSpacing: 6,
              itemWidth: 100,
              itemHeight: 18,
              itemTextColor: '#999',
              itemDirection: 'left-to-right',
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: 'circle',
              effects: [
                  {
                      on: 'hover',
                      style: {
                          itemTextColor: '#000'
                      }
                  }
              ]
          }
      ]}
  />
    )
}
