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
import { prettyDate } from '../../services/Date/';
import DolarChartGradient from './DolarChartGradient';
import { DateRange, dateRangeAsIsoDate } from '../../services/Date';

export interface DolarChartProps {
  dateRange: DateRange;
  width: number;
  height: number;
}

const DolarChart: FunctionComponent<DolarChartProps> = ({
  dateRange,
  width,
  height,
}): JSX.Element => {
  const [chartData, setChartData] = useState<DolarHistoryAPIResult[]>([]);

  // Fetchs the data from the api using a defined service
  useEffect(() => {
    const fetchDolar = async () => {
      let params = {
        page_size: 1500,
        date__range: dateRangeAsIsoDate(dateRange),
      };

      const dolarHistory = await getDolarHistory(params);

      setChartData(dolarHistory.reverse());
    };

    fetchDolar();
  }, [dateRange]);

  return (
    <AreaChart
      width={width}
      height={height}
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
