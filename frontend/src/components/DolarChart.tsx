import { useState, useEffect } from 'react';
import { FunctionComponent } from 'react';
import {
  VictoryLine,
  VictoryChart,
  VictoryZoomContainer,
  VictoryTooltip,
  VictoryScatter,
} from 'victory';
import { DolarHistoryAPIResult } from '../services/DolarApi/types';
import { getDolarHistory } from '../services/DolarApi/util';

const DolarChart: FunctionComponent<any> = (): JSX.Element => {
  const [chartData, setChartData] = useState<DolarHistoryAPIResult[]>([]);

  useEffect(() => {
    const fetchDolar = async () => {
      const dolarHistory = await getDolarHistory({
        page_size: 500,
        date__range: ['2021-12-01T00:00:00Z', '2022-02-01T23:59:59Z'],
      });

      setChartData(dolarHistory);
    };

    fetchDolar();
  }, []);

  return (
    <VictoryChart
      width={500}
      height={300}
      domainPadding={20}
      containerComponent={<VictoryZoomContainer zoomDimension="x" />}
    >
      <VictoryLine
        style={{ data: { strokeWidth: 1 } }}
        data={chartData}
        x="date"
        y="price"
      />

      <VictoryScatter
        style={{ data: { fill: 'red' } }}
        size={2}
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
