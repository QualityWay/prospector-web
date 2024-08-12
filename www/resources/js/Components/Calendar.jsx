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

    function SelectedDay(props) {
        const { lancamentos = [], day, outsideCurrentMonth, ...other } = props;
        const isSelected = !outsideCurrentMonth && lancamentos.filter((x) => x.getTime() === day.getTime()).length === 1;

        return (
            <Badge
                key={props.day.toString()}
                overlap="circular"
                badgeContent={isSelected ? '✅' : undefined}
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
                    slotProps={
                        {
                            nextIconButton: { sx: { display: 'none' } },
                            previousIconButton: { sx: { display: 'none' } },
                            calendarHeader: {
                                sx: {
                                    '.MuiPickersCalendarHeader-labelContainer': {
                                        fontWeight: 'bold',
                                    },
                                }
                            },
                        }
                    }
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
