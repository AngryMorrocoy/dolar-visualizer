import { useState, useEffect } from 'react';
import { FunctionComponent } from 'react';
import {
  VictoryLine,
  VictoryChart,
  VictoryAxis,
  VictoryZoomContainer,
  VictoryTooltip,
  VictoryScatter,
} from 'victory';

import axios from 'axios';

type dolarHistoryResult = {
  date: Date;
  price: number;
  url: string;
};

type dolarHistoryResponse = {
  date: string;
  price: number;
  url: string;
};

const DolarChart: FunctionComponent<any> = (): JSX.Element => {
  const mockData = [
    { quarter: 1, earnings: 19000 },
    { quarter: 2, earnings: 16500 },
    { quarter: 3, earnings: 14250 },
    { quarter: 4, earnings: 1200 },
    { quarter: 5, earnings: 15009 },
    { quarter: 6, earnings: 12411 },
    { quarter: 7, earnings: 1241 },
    { quarter: 8, earnings: 18958 },
    { quarter: 9, earnings: 19089 },
    { quarter: 10, earnings: 19000 },
  ];

  const [chartData, setChartData] = useState<dolarHistoryResult[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/dolar-history/', {
        params: {
          date__range: '2021-12-01T00:00:00Z,2022-01-04T23:59:59Z',
          page_size: 46,
        },
      })
      .then((response) => {
        console.log(response.data);
        const data = response.data.results;
        const respParsed: dolarHistoryResult[] = data.map(
          (result: dolarHistoryResponse) => {
            const dateSecs = Date.parse(result.date);
            return { ...result, date: new Date(dateSecs) };
          }
        );

        setChartData(respParsed);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <VictoryChart
      width={500}
      height={300}
      domainPadding={20}
      containerComponent={<VictoryZoomContainer zoomDimension="x" />}
    >
      {
        // <VictoryAxis
        //   tickValues={chartData.map((item) => item.date)}
        //   tickFormat={chartData.map(
        //     (item) => `${item.date.getDay()}-${item.date.getMonth()}`
        //   )}
        // />
        // <VictoryAxis dependentAxis />
      }

      <VictoryLine data={chartData} x="date" y="price" />

      <VictoryScatter
        style={{ data: { fill: 'salmon' } }}
        data={chartData}
        x="date"
        y="price"
        labels={chartData.map((item) => {
          const month = item.date.getMonth() + 1;
          const day = item.date.getDay();
          const year = item.date.getFullYear();
          const hour = item.date.getHours();
          const minutes = `0${item.date.getMinutes()}`;
          return `${day}-${month}-${year} -> ${hour}:${minutes}\n${item.price}`;
        })}
        labelComponent={<VictoryTooltip />}
      />
    </VictoryChart>
  );
};

export default DolarChart;
