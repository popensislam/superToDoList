import './modal.css'
import starIcon from '../../assets/star.svg'
import closeIcon from '../../assets/close.svg'
import dateIcon from '../../assets/date.svg'
import Datepicker from '../UI/Datepicker';
import { useEffect, useState } from 'react';
import Checkbox from '../UI/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { turnOffModalAdd, addTask } from '../../store/taskSlice/taskSlice';
import { addImportantTask, removeImportantTask } from '../../store/importantSlice/importantTasksSlice';

const ModalAddTask = () => {

    const dispatch = useDispatch()

    const modalAdd = useSelector(store => store.tasks.modalAdd)
    const task = useSelector(store => store.tasks.modalTask)

    const [activeCalendar, setActiveCalendar] = useState(false)

    const [choosenDate, setChoosenDate] = useState('')

    const [timeWrited, setTimeWrited] = useState({
        hours: '',
        minutes: ''
    })

    const onChangeTime = (e) => {
        setTimeWrited({
            ...timeWrited,
            [e.target.name]: e.target.value
        })
    }

    const [date, setDate] = useState('')

    const onChangeDate = () => {
        setDate(`${timeWrited.hours}:${timeWrited.minutes} / ${choosenDate}`)
    }
    useEffect(() => {
        if (timeWrited.hours || timeWrited.minutes || choosenDate) {
            onChangeDate()
        }
    }, [timeWrited, choosenDate])

    const [value, setValue] = useState({
        name: '',
        desc: ''
    })

    const handleOnChangeValue = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        })
    }

    const [productActive, setProductActive] = useState(false)
    const [healthActive, setHealthActive] = useState(false)
    const [educActive, setEducActive] = useState(false)
    const [importActive, setImportActive] = useState(false)
    const [starTask, setStarTask] = useState(false)

    useEffect(() => {
        if (task.length !== 0) {
            setProductActive(task.productiveTag)
            setHealthActive(task.healthTag)
            setEducActive(task.educationTag)
            setImportActive(task.importantTag)
            setStarTask(task.star)
            setValue({ name: task.title, desc: task.description })
            setDate(task.date)
        } else {
            setProductActive(false)
            setHealthActive(false)
            setEducActive(false)
            setImportActive(false)
            setStarTask(false)
            setValue({ name: '', desc: '' })
            setDate('')
        }
    }, [task])


    const [error, setError] = useState({
        name: '',
        desc: '',
        date: '',
        tag: ''
    })

    const addTaskModal = () => {
        if (productActive || healthActive || educActive || importActive) {

            if (!value.name) {
                setValue({
                    ...value,
                    name: 'Введите название'
                })
                setTimeout(() => {
                    setValue({
                        ...value,
                        name: ''
                    })
                }, 3000)
            }

            if (!value.desc) {
                setValue({
                    ...value,
                    desc: 'Введите описание'
                })
                setTimeout(() => {
                    setValue({
                        ...value,
                        desc: ''
                    })
                }, 3000)
            }

            if (!date) {
                setError({
                    ...error,
                    date: 'Выберите дату'
                })
                setTimeout(() => {
                    setError({
                        ...error,
                        date: ''
                    })
                }, 3000)
            }

            const newTask = {
                id: task.id ? task.id : Date.now(),
                title: value.name,
                description: value.desc,
                date: date,
                star: starTask,
                productiveTag: productActive,
                healthTag: healthActive,
                educationTag: educActive,
                importantTag: importActive,
                isCompleted: false
            }

            if (starTask === true) {
                dispatch(addImportantTask(newTask))
                dispatch(addTask(newTask))
            } else {
                dispatch(removeImportantTask(newTask))
                dispatch(addTask(newTask))
            }

            dispatch(turnOffModalAdd())

        } else {
            setError({
                ...error,
                tag: 'Выберите хотя бы 1 тег'
            })
            setTimeout(() => {
                setError({
                    ...error,
                    tag: ''
                })
            }, 3000)
        }
    }

    return (
        <div className="modal" style={modalAdd ? {} : { display: 'none' }}>
            <div className='modal-wrapper'>
                <div className='modal-header'>
                    <span>Задача</span>
                    <div className='icons'>
                        <img src={starIcon} alt='stars icon' />
                        <img src={closeIcon} alt='closes icon' onClick={() => dispatch(turnOffModalAdd())} style={{ cursor: 'pointer' }} />
                    </div>
                </div>
                <div className='modal-item'>
                    <label>Название</label>
                    <input value={value.name} className={error.name ? 'error' : ''} name='name' onChange={e => handleOnChangeValue(e)} type='text' placeholder='Название задачи' />
                    <p className='errorText'>{error.name}</p>

                </div>
                <div className='modal-item check'>
                    <Checkbox id='modal-important' checked={starTask} onChangeCheck={() => setStarTask(!starTask)}>
                        Важная задача
                    </Checkbox>
                </div>
                <div className='modal-item date' style={{ position: 'relative' }}>
                    <label>Дата и время окончания</label>
                    <input value={date} style={{ color: '#fff' }} className={error.date ? 'error' : ''} type='text' placeholder='Выберите время и дату' disabled />
                    <img onClick={() => setActiveCalendar(!activeCalendar)} className='date-icon' src={dateIcon} alt='dates icon' />
                    <p className='errorText'>{error.date}</p>
                    <Datepicker onChangeDate={onChangeDate} onChangeTime={onChangeTime} timeWrited={timeWrited} setTimeWrited={setTimeWrited} choosenDate={choosenDate} setChoosenDate={setChoosenDate} activeCalendar={activeCalendar} />
                </div>
                <div className='modal-item description'>
                    <label>Описание</label>
                    <textarea value={value.desc} name='desc' className={error.desc ? 'error' : ''} onChange={e => handleOnChangeValue(e)} placeholder='Опишите задачу' />
                    <p className='errorText'>{error.desc}</p>
                </div>
                <div className='modal-tags'>
                    <span>Теги</span>
                    <div className='modal-tags-items'>
                        <Checkbox id='product' checked={productActive} onChangeCheck={() => setProductActive(!productActive)}>Продуктивный</Checkbox>
                        <Checkbox id='health' checked={healthActive} onChangeCheck={() => setHealthActive(!healthActive)}>Здоровье</Checkbox>
                        <Checkbox id='educ' checked={educActive} onChangeCheck={() => setEducActive(!educActive)}>Образование</Checkbox>
                        <Checkbox id='import' checked={importActive} onChangeCheck={() => setImportActive(!importActive)}>Срочно</Checkbox>
                    </div>
                    <p className='errorText' style={{ marginTop: '5px' }}>{error.tag}</p>
                    <div className='modal-btn'>
                        {
                            task.length != 0
                                ?
                                <button className='add' onClick={() => addTaskModal()}>Сохранить</button>
                                :
                                <button className='add' onClick={() => addTaskModal()}>Добавить</button>
                        }
                        <button className='delete'>Удалить</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalAddTask;