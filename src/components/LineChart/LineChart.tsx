import { useNavigate } from "react-router-dom";
import { ResponsiveLine, ResponsiveLineCanvas } from "@nivo/line";
import "./LineChart.scss";

interface IProps { props: Map<string, any> }

export const LineChart = ({ props }: IProps) => {
  const data: any[] = [];
 console.log(data)
  props.forEach((v, k) => data.push({
    id: k,
    data: v.map((item: any) => {

      const key = Object.keys(item)[0]

      return {
        x: key,
        y: item[key]
      }

    })
  }))
  console.log(props)
  return (
    <>
    <ResponsiveLineCanvas
      data={data}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "За аналогичный период по месяцам",
        legendOffset: 36,
        legendPosition: "middle",
        truncateTickAt: 0,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "репортов",
        legendOffset: -40,
        legendPosition: "middle",
        truncateTickAt: 0,
      }}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}

      enableTouchCrosshair={true}

      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
    </>
  );
};
