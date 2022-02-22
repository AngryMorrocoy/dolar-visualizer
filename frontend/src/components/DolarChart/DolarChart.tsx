import { FunctionComponent, useState, useEffect } from 'react';
import { DolarHistoryAPIResult } from '../../services/DolarApi/types';
import { getDolarHistory } from '../../services/DolarApi/util';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { prettyDate } from '../../services/Date/prettyDate';
import DolarChartGradient from './DolarChartGradient';

const DolarChart: FunctionComponent<any> = (): JSX.Element => {
  const [chartData, setChartData] = useState<DolarHistoryAPIResult[]>([]);

  // Fetchs the data from the api using a defined service
  useEffect(() => {
    const fetchDolar = async () => {
      const dolarHistory = await getDolarHistory({
        page_size: 18,
        // date__range: ['2022-10-01', '2022-02-20'],
      });

      setChartData(dolarHistory.reverse());
    };

    fetchDolar();
  }, []);

  return (
    <AreaChart
      width={900}
      height={600}
      data={chartData.map((value) => {
        return { ...value, date: value.date.toDate() };
      })}
      margin={{
        top: 30,
        right: 30,
        left: 10,
        bottom: 5,
      }}
      onClick={(ns, evt) => {
        console.log(ns);
        console.log(evt);
      }}
    >
      <defs>
        <DolarChartGradient id="dolarHistoryGradient" />
      </defs>

      <Area
        type="monotone"
        dataKey="price"
        stroke="rgb(0, 75, 168)"
        fill="url(#dolarHistoryGradient)"
        dot={true}
      />

      <XAxis
        dataKey="date"
        minTickGap={10}
        tickFormatter={(value) => {
          if (!(value instanceof Date)) return '';
          const formattedDate = prettyDate(value);
          const onlyDate = formattedDate.match(/^[^\s]+/);
          if (!onlyDate) return '';

          return onlyDate[0];
        }}
        domain={['dataMin', 'dataMax']}
        interval="preserveEnd"
      />

      <YAxis
        minTickGap={0.2}
        interval="preserveStartEnd"
        dataKey="price"
        tickFormatter={(value: number) => {
          return value.toFixed(2);
        }}
        domain={['dataMin - 0.01', 'dataMax + 0.05']}
      />

      <Tooltip
        formatter={(value: number) => {
          return [`${value}Bs`, 'Precio'];
        }}
        labelFormatter={(label: Date | undefined) => {
          if (!(label instanceof Date)) return '';
          return prettyDate(label);
        }}
        animationDuration={0}
      />

      <CartesianGrid strokeDasharray="1 1 0" stroke="gray" />
    </AreaChart>
  );
};

export default DolarChart;
