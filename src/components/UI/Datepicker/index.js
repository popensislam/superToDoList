import moment from "moment";
import { useState } from "react";
import Calendar from "../Calendar";

const Datepicker = ({ onChangeTime, timeWrited, choosenDate, setChoosenDate, activeCalendar }) => {

    const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

    const [today, setToday] = useState(moment())

    const startDay = today.clone().startOf('month').startOf('week')
    const currentMonth = today.clone().format('MMMM')
    const currentYear = today.clone().format('YYYY')
    const flexibleCurrentMonth = today.clone()
    const day = startDay.clone()

    const daysArray = [...Array(42)].map(() => day.add(1, 'day').clone()) // Заполняю массив датами

    const handlePrevMonth = () => {
        setToday(prev => prev.clone().subtract(1, 'month'))
    }
    const handleNextMonth = () => {
        setToday(prev => prev.clone().add(1, 'month'))
    }

    return (
        <div style={{ position: 'relative' }} className={activeCalendar ? '' : 'hide'}>
            <Calendar
                handlePrevMonth={handlePrevMonth}
                handleNextMonth={handleNextMonth}
                currentYear={currentYear}
                currentMonth={currentMonth}
                flexibleCurrentMonth={flexibleCurrentMonth}
                daysArray={daysArray}
                days={days}
                setChoosenDate={setChoosenDate}
                choosenDate={choosenDate}
            />
            <div className="time">
                <input value={timeWrited.hours} onChange={onChangeTime} name='hours' type='number' placeholder="12"/>
                <span>:</span>
                <input value={timeWrited.minutes} onChange={onChangeTime} name='minutes' type='number' placeholder="00"/>
            </div>
        </div>
    );
}

export default Datepicker;