
import './calendar.css'
import SwitchMonth from './switchMonth';

const Calendar = ({ choosenDate, setChoosenDate, handlePrevMonth, handleNextMonth, currentYear, currentMonth, flexibleCurrentMonth, daysArray, currentDay, setActive, days }) => {



    return (
        <div className="calendar">
            <SwitchMonth
                handlePrevMonth={handlePrevMonth}
                handleNextMonth={handleNextMonth}
                currentYear={currentYear}
                currentMonth={currentMonth}
                flexibleCurrentMonth={flexibleCurrentMonth}
            />
            <div className='grid'>
                {
                    days.map(item =>
                        <div className='grid-item' key={item}>
                            <p> {item} </p>
                        </div>
                    )
                }
                {daysArray.map(day =>
                    <div onClick={() => setChoosenDate(day.format('DD.MM.YYYY'))} className={day.isoWeekday() == 6 || day.isoWeekday() == 7 ?  choosenDate == day.format('DD.MM.YYYY') ? "grid-item weekend activeCalendar" : "grid-item weekend" : choosenDate == day.format('DD.MM.YYYY') ? "grid-item activeCalendar" : "grid-item"} key={day.format('DD-MM-YYYY')}>
                        <p className='' > {day.format('D')} </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Calendar;