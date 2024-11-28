import { ResponsivePie, ResponsivePieCanvas } from '@nivo/pie'

import './PieChart.scss'
import { SYSTEMS_COLOR_SETTINGS } from '../../utils'

interface IProps {
    props: Map<string, any>
}

export const PieChart: React.FC<IProps> = ({ props }: IProps) => {

    const data: any[] = []
    console.log(props)
    props.forEach((v, k) => {
        console.log(k, SYSTEMS_COLOR_SETTINGS.get(k))
        data.push({
            "id": k,
            "label": SYSTEMS_COLOR_SETTINGS.get(k).label,
            "value": v.num,
            "color": SYSTEMS_COLOR_SETTINGS.get(k).color
        })
    })
    return (
        <ResponsivePieCanvas
            data={data}
            margin={{ top: 40, right: 150, bottom: 80, left: 0 }}
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
            enableArcLinkLabels={false}
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
                    anchor: 'top-right',
                    direction: 'column',
                    justify: false,
                    translateX: 20,
                    translateY: 0,
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
