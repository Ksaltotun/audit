import { useNavigate } from 'react-router-dom'
import { ResponsiveLine } from '@nivo/line'
import './LineChart.scss'


export const LineChart = (props) => {
   const data = [
    {
      "id": "japan",
      "color": "hsl(253, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 204
        },
        {
          "x": "helicopter",
          "y": 245
        },
        {
          "x": "boat",
          "y": 137
        },
        {
          "x": "train",
          "y": 57
        },
        {
          "x": "subway",
          "y": 7
        },
        {
          "x": "bus",
          "y": 11
        },
        {
          "x": "car",
          "y": 52
        },
        {
          "x": "moto",
          "y": 197
        },
        {
          "x": "bicycle",
          "y": 216
        },
        {
          "x": "horse",
          "y": 77
        },
        {
          "x": "skateboard",
          "y": 269
        },
        {
          "x": "others",
          "y": 281
        }
      ]
    },
    {
      "id": "france",
      "color": "hsl(7, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 259
        },
        {
          "x": "helicopter",
          "y": 197
        },
        {
          "x": "boat",
          "y": 143
        },
        {
          "x": "train",
          "y": 200
        },
        {
          "x": "subway",
          "y": 235
        },
        {
          "x": "bus",
          "y": 56
        },
        {
          "x": "car",
          "y": 148
        },
        {
          "x": "moto",
          "y": 69
        },
        {
          "x": "bicycle",
          "y": 247
        },
        {
          "x": "horse",
          "y": 89
        },
        {
          "x": "skateboard",
          "y": 110
        },
        {
          "x": "others",
          "y": 82
        }
      ]
    },
    {
      "id": "us",
      "color": "hsl(24, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 56
        },
        {
          "x": "helicopter",
          "y": 31
        },
        {
          "x": "boat",
          "y": 231
        },
        {
          "x": "train",
          "y": 239
        },
        {
          "x": "subway",
          "y": 77
        },
        {
          "x": "bus",
          "y": 151
        },
        {
          "x": "car",
          "y": 18
        },
        {
          "x": "moto",
          "y": 156
        },
        {
          "x": "bicycle",
          "y": 172
        },
        {
          "x": "horse",
          "y": 241
        },
        {
          "x": "skateboard",
          "y": 51
        },
        {
          "x": "others",
          "y": 60
        }
      ]
    },
    {
      "id": "germany",
      "color": "hsl(81, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 89
        },
        {
          "x": "helicopter",
          "y": 85
        },
        {
          "x": "boat",
          "y": 81
        },
        {
          "x": "train",
          "y": 294
        },
        {
          "x": "subway",
          "y": 167
        },
        {
          "x": "bus",
          "y": 49
        },
        {
          "x": "car",
          "y": 285
        },
        {
          "x": "moto",
          "y": 134
        },
        {
          "x": "bicycle",
          "y": 49
        },
        {
          "x": "horse",
          "y": 190
        },
        {
          "x": "skateboard",
          "y": 13
        },
        {
          "x": "others",
          "y": 250
        }
      ]
    },
    {
      "id": "norway",
      "color": "hsl(287, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 96
        },
        {
          "x": "helicopter",
          "y": 125
        },
        {
          "x": "boat",
          "y": 195
        },
        {
          "x": "train",
          "y": 264
        },
        {
          "x": "subway",
          "y": 236
        },
        {
          "x": "bus",
          "y": 244
        },
        {
          "x": "car",
          "y": 221
        },
        {
          "x": "moto",
          "y": 225
        },
        {
          "x": "bicycle",
          "y": 239
        },
        {
          "x": "horse",
          "y": 250
        },
        {
          "x": "skateboard",
          "y": 156
        },
        {
          "x": "others",
          "y": 259
        }
      ]
    }
  ]
    return (
        <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'transportation',
            legendOffset: 36,
            legendPosition: 'middle',
            truncateTickAt: 0
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendOffset: -40,
            legendPosition: 'middle',
            truncateTickAt: 0
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabel="data.yFormatted"
        pointLabelYOffset={-12}
        enableTouchCrosshair={true}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
    )
}
