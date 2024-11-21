import { useNavigate } from 'react-router-dom'
import { ResponsiveBar } from '@nivo/bar'
import './BarChart.scss'


export const BarChart = (props) => {
   const data = [
    {
      "country": "AD",
      "hot dog": 62,
      "hot dogColor": "hsl(116, 70%, 50%)",
      "burger": 128,
      "burgerColor": "hsl(315, 70%, 50%)",
      "sandwich": 8,
      "sandwichColor": "hsl(160, 70%, 50%)",
      "kebab": 82,
      "kebabColor": "hsl(190, 70%, 50%)",
      "fries": 83,
      "friesColor": "hsl(272, 70%, 50%)",
      "donut": 121,
      "donutColor": "hsl(7, 70%, 50%)"
    },
    {
      "country": "AE",
      "hot dog": 18,
      "hot dogColor": "hsl(218, 70%, 50%)",
      "burger": 68,
      "burgerColor": "hsl(233, 70%, 50%)",
      "sandwich": 67,
      "sandwichColor": "hsl(15, 70%, 50%)",
      "kebab": 170,
      "kebabColor": "hsl(165, 70%, 50%)",
      "fries": 133,
      "friesColor": "hsl(187, 70%, 50%)",
      "donut": 41,
      "donutColor": "hsl(326, 70%, 50%)"
    },
    {
      "country": "AF",
      "hot dog": 144,
      "hot dogColor": "hsl(86, 70%, 50%)",
      "burger": 138,
      "burgerColor": "hsl(142, 70%, 50%)",
      "sandwich": 107,
      "sandwichColor": "hsl(10, 70%, 50%)",
      "kebab": 162,
      "kebabColor": "hsl(304, 70%, 50%)",
      "fries": 104,
      "friesColor": "hsl(50, 70%, 50%)",
      "donut": 134,
      "donutColor": "hsl(328, 70%, 50%)"
    },
    {
      "country": "AG",
      "hot dog": 132,
      "hot dogColor": "hsl(125, 70%, 50%)",
      "burger": 77,
      "burgerColor": "hsl(160, 70%, 50%)",
      "sandwich": 138,
      "sandwichColor": "hsl(331, 70%, 50%)",
      "kebab": 76,
      "kebabColor": "hsl(64, 70%, 50%)",
      "fries": 16,
      "friesColor": "hsl(160, 70%, 50%)",
      "donut": 13,
      "donutColor": "hsl(339, 70%, 50%)"
    },
    {
      "country": "AI",
      "hot dog": 22,
      "hot dogColor": "hsl(185, 70%, 50%)",
      "burger": 47,
      "burgerColor": "hsl(263, 70%, 50%)",
      "sandwich": 57,
      "sandwichColor": "hsl(39, 70%, 50%)",
      "kebab": 169,
      "kebabColor": "hsl(232, 70%, 50%)",
      "fries": 19,
      "friesColor": "hsl(86, 70%, 50%)",
      "donut": 166,
      "donutColor": "hsl(319, 70%, 50%)"
    },
    {
      "country": "AL",
      "hot dog": 21,
      "hot dogColor": "hsl(260, 70%, 50%)",
      "burger": 101,
      "burgerColor": "hsl(12, 70%, 50%)",
      "sandwich": 54,
      "sandwichColor": "hsl(1, 70%, 50%)",
      "kebab": 11,
      "kebabColor": "hsl(355, 70%, 50%)",
      "fries": 49,
      "friesColor": "hsl(81, 70%, 50%)",
      "donut": 66,
      "donutColor": "hsl(193, 70%, 50%)"
    },
    {
      "country": "AM",
      "hot dog": 156,
      "hot dogColor": "hsl(262, 70%, 50%)",
      "burger": 187,
      "burgerColor": "hsl(338, 70%, 50%)",
      "sandwich": 112,
      "sandwichColor": "hsl(141, 70%, 50%)",
      "kebab": 21,
      "kebabColor": "hsl(110, 70%, 50%)",
      "fries": 143,
      "friesColor": "hsl(179, 70%, 50%)",
      "donut": 133,
      "donutColor": "hsl(252, 70%, 50%)"
    }
  ]
    return (
      <ResponsiveBar
      data={data}
      keys={[
          'hot dog',
          'burger',
          'sandwich',
          'kebab',
          'fries',
          'donut'
      ]}
      indexBy="country"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      groupMode="grouped"
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      colors={{ scheme: 'nivo' }}
      defs={[
          {
              id: 'dots',
              type: 'patternDots',
              background: 'inherit',
              color: '#38bcb2',
              size: 4,
              padding: 1,
              stagger: true
          },
          {
              id: 'lines',
              type: 'patternLines',
              background: 'inherit',
              color: '#eed312',
              rotation: -45,
              lineWidth: 6,
              spacing: 10
          }
      ]}
      fill={[
          {
              match: {
                  id: 'fries'
              },
              id: 'dots'
          },
          {
              match: {
                  id: 'sandwich'
              },
              id: 'lines'
          }
      ]}
      borderColor={{
          from: 'color',
          modifiers: [
              [
                  'darker',
                  1.6
              ]
          ]
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'country',
          legendPosition: 'middle',
          legendOffset: 32,
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
      legends={[
          {
              dataFrom: 'keys',
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: 'left-to-right',
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                  {
                      on: 'hover',
                      style: {
                          itemOpacity: 1
                      }
                  }
              ]
          }
      ]}
      role="application"
      ariaLabel="Nivo bar chart demo"
      barAriaLabel={e=>e.id+": "+e.formattedValue+" in country: "+e.indexValue}
  />
    )
}
