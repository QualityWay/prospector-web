import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { ptBR } from 'date-fns/locale/pt-BR';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import Badge from '@mui/material/Badge';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { styled } from '@mui/material/styles';

export const Calendar = (props) => {
    const CustomPickersDay = styled(PickersDay)`
        &.selected_day {
            background-color: orange !important;
            border: none;
        }
    `;

    const IconBxsCheckSquare = (props) => {
        return (
            <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                height="1em"
                width="1em"
                {...props}
            >
                <path d="M19 3H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zm-7.933 13.481l-3.774-3.774 1.414-1.414 2.226 2.226 4.299-5.159 1.537 1.28-5.702 6.841z" />
            </svg>
        );
    }

    function SelectedDay(props) {
        const { lancamentos = [], day, outsideCurrentMonth, ...other } = props;
        const isSelected = !outsideCurrentMonth && lancamentos.filter((x) => x.getTime() === day.getTime()).length === 1;

        return (
            <Badge
                key={props.day.toString()}
                overlap="circular"
                badgeContent={isSelected ? <IconBxsCheckSquare fill='green' /> : undefined}
            >
                <CustomPickersDay
                    {...other}
                    outsideCurrentMonth={outsideCurrentMonth}
                    day={day}
                    className={isSelected ? 'selected_day' : undefined}
                />
            </Badge>
        );
    }

    return (
        <div className='p-1'>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
                <DateCalendar
                    views={['day']}
                    sx={{
                        backgroundColor: '#fdfbff',
                        borderRadius: 3,
                        boxShadow: 1,
                        width: '300px'
                    }}
                    renderLoading={() => <DayCalendarSkeleton />}
                    slots={{
                        day: SelectedDay,
                    }}
                    {...props}
                />
            </LocalizationProvider>
        </div>
    );
};

export const YearPicker = (props) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
            <DatePicker
                views={['year']}
                slotProps={
                    {
                        textField: {
                            readOnly: true,
                            sx: {
                                width: '130px',
                            },
                        }
                    }
                }
                {...props}
            />
        </LocalizationProvider>
    );
};
