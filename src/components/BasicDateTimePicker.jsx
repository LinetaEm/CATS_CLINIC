// MUI
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { FormControl } from '@mui/material';

// DAYJS
import 'dayjs/locale/lt';
import dayjs from 'dayjs';

export default function BasicDateTimePicker({editableVisit, setFieldValue}) {
  return (
    <LocalizationProvider adapterLocale="lt" dateAdapter={AdapterDayjs}>
      <FormControl sx={{mt: 1}} fullWidth>
        <DateTimePicker defaultValue={editableVisit && dayjs(editableVisit.selectedTime) || dayjs(new Date())} onChange={(value) =>  setFieldValue("dateTime", value) } label="Basic date time picker" />
      </FormControl>
    </LocalizationProvider>
  );
}