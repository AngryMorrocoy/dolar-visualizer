import { FunctionComponent, useState } from 'react';

import DateRangePicker from '../DateRangePicker/DateRangePicker';
import { DateRange } from '../../services/Date';
import DolarChart from '../DolarChart/DolarChart';
import dayjs, { Dayjs } from 'dayjs';
import { Stack } from '@mui/material';

const BodyChart: FunctionComponent<any> = (): JSX.Element => {
  const [dateRange, setDateRange] = useState<DateRange>({
    start: dayjs().subtract(7, 'days'),
    end: dayjs(),
  });

  const updateRangeState = (
    date: Dayjs | null,
    rangePhase: 'start' | 'end'
  ) => {
    if (!date) return;
    setDateRange({ ...dateRange, [rangePhase]: date });
  };

  return (
    <Stack justifyContent="center" alignItems="center" spacing={4}>
      <DateRangePicker
        value={dateRange}
        onChange={updateRangeState}
        startLabel="Fecha inicial"
        endLabel="Fecha final"
      />
      <DolarChart dateRange={dateRange} width="90%" height={400} />
    </Stack>
  );
};

export default BodyChart;
