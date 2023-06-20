"use client";

import { DateRange, Range, RangeKeyDict } from "react-date-range";

// styles
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

// interfaces
export interface CalendarProps {
    value: Range;
    onChange: (value: RangeKeyDict) => void;
    disabledDates?: Date[];
}

const Calendar: React.FC<CalendarProps> = ({
    value,
    onChange,
    disabledDates,
}) => {
    return (
        <DateRange
            rangeColors={['#262626']}
            ranges={[value]}
            date={new Date()}
            direction="vertical"
            showDateDisplay={false}
            disabledDates={disabledDates}
        />
    );
}

export default Calendar;