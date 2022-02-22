import { FunctionComponent, useState } from 'react';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import { Box, TextField } from '@mui/material';
import DateAdapter from '@mui/lab/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import localeES from 'dayjs/locale/es';

export interface DateRange {
  start: Dayjs;
  end: Dayjs;
}

const DateRangePicker: FunctionComponent<any> = (): JSX.Element => {
  const [range, setRange] = useState<DateRange>({
    start: dayjs().subtract(7, 'days'),
    end: dayjs(),
  });

  const updateRangeState = (newDate: Dayjs | null, rangeKey: string) => {
    if (!newDate) return;
    setRange({ ...range, [rangeKey]: newDate });
  };

  return (
    <Box>
      <LocalizationProvider dateAdapter={DateAdapter} locale={localeES}>
        <DatePicker
          maxDate={range.end}
          value={range.start}
          onChange={(date) => updateRangeState(date, 'start')}
          label="Fecha inicial"
          renderInput={(params) => (
            <TextField {...params} name="start-date" id="startDate" />
          )}
        />
        <DatePicker
          maxDate={dayjs().add(1, 'days')}
          value={range.end}
          onChange={(date) => updateRangeState(date, 'end')}
          label="Fecha final"
          renderInput={(params) => (
            <TextField {...params} name="end-date" id="endDate" />
          )}
        />
      </LocalizationProvider>
    </Box>
  );
};

export default DateRangePicker;
