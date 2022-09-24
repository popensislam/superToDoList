import arrowIcon from '../../../../assets/arrow.svg'

const SwitchMonth = ({ handlePrevMonth, handleNextMonth, currentYear, currentMonth, flexibleCurrentMonth}) => {
    return ( 
        <div className='switch-calendar'>
            <img style={{cursor: 'pointer'}} onClick={handlePrevMonth} src={arrowIcon} alt='arrows icon'/>
            <span>{ currentMonth + ' ' + currentYear } </span>
            <img onClick={handleNextMonth} style={{transform: 'rotate(180deg)', cursor: 'pointer'}} src={arrowIcon} alt='arrows icon'/>
        </div>
     );
}
 
export default SwitchMonth;