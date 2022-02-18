import { FunctionComponent, useState, useEffect } from 'react';
import { DolarHistoryAPIResult } from '../../services/DolarApi/types';
import { getDolarHistory } from '../../services/DolarApi/util';
import { Area, AreaChart, Tooltip, TooltipProps, XAxis, YAxis } from 'recharts';
import { prettyDate } from '../../services/Date/prettyDate';

const DolarChart: FunctionComponent<any> = (): JSX.Element => {
  const [chartData, setChartData] = useState<DolarHistoryAPIResult[]>([]);

  // Fetchs the data from the api using a defined service
  useEffect(() => {
    const fetchDolar = async () => {
      const dolarHistory = await getDolarHistory({
        page_size: 100,
        // date__range: ['2021-12-01T00:00:00Z', '2022-02-01T23:59:59Z'],
      });

      setChartData(dolarHistory.reverse());
    };

    fetchDolar();
  }, []);

  return (
    <AreaChart
      width={900}
      height={600}
      data={chartData}
      margin={{
        top: 30,
        right: 30,
        left: 10,
        bottom: 5,
      }}
    >
      <defs>
        <linearGradient
          id="dolarHistoryGradient"
          x1="50%"
          y1="0%"
          x2="50%"
          y2="100%"
        >
          <stop offset="5%" stopColor="rgb(0, 75, 168)" stopOpacity={0.7} />
          <stop offset="95%" stopColor="rgb(0, 75, 168)" stopOpacity={0.1} />
        </linearGradient>
      </defs>

      <Area
        type="monotone"
        dataKey="price"
        stroke="#000000"
        fillOpacity={0.9}
        fill="url(#dolarHistoryGradient)"
      />

      <XAxis
        dataKey="date"
        minTickGap={10}
        tickFormatter={(value) => {
          if (!(value instanceof Date)) return '';

          const formattedDate = prettyDate(value);
          const onlyDate = formattedDate.match(/^[^\s]+/);

          if (!onlyDate) return "";

          return onlyDate[0];
        }}
        domain={['dataMin', 'dataMax']}
      />
      <YAxis
        dataKey="price"
        tickFormatter={(value: number) => {
          return value.toFixed(2);
        }}
        domain={['dataMin - 0.01', 'dataMax']}
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
    </AreaChart>
  );
};

export default DolarChart;
