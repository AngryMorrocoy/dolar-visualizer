import { FunctionComponent } from 'react';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import { Box, TextField } from '@mui/material';
import DateAdapter from '@mui/lab/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import localeES from 'dayjs/locale/es';
import { DateRange } from '../../services/Date';

export interface DateRangePickerProps {
  value: DateRange;
  onChange: (date: Dayjs | null, rangePhase: 'start' | 'end') => void;
  startLabel: string;
  endLabel: string;
}

const DateRangePicker: FunctionComponent<DateRangePickerProps> = ({
  value,
  onChange,
  startLabel,
  endLabel
}): JSX.Element => {
  return (
    <Box>
      <LocalizationProvider dateAdapter={DateAdapter} locale={localeES}>
        <DatePicker
          maxDate={value.end}
          value={value.start}
          onChange={(date) => onChange(date, 'start')}
          label={startLabel}
          renderInput={(params) => (
            <TextField {...params} name="start-date" id="startDate" />
          )}
        />
        <DatePicker
          maxDate={dayjs().add(1, 'days')}
          value={value.end}
          onChange={(date) => onChange(date, 'end')}
          label={endLabel}
          renderInput={(params) => (
            <TextField {...params} name="end-date" id="endDate" />
          )}
        />
      </LocalizationProvider>
    </Box>
  );
};

export default DateRangePicker;
