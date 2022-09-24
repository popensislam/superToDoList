import searchIcon from '../../assets/search.svg'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux/es/exports'
import './search.css'
import { useState } from 'react'
import { addSearchValue } from '../../store/taskSlice/taskSlice'
import { RESULT } from '../routes/constants'

const Search = () => {

    const [value, setValue] = useState('')

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const search = e => {
        e.preventDefault();
    
        dispatch(addSearchValue(value))
        
        navigate(RESULT)
      }

    return (
        <div className='search'>
            <img src={searchIcon} alt='searchs icon' onClick={() => navigate('/result')} />
            <form onSubmit={search}>
                <input value={value} onChange={(e) => setValue(e.target.value)} type='text' placeholder='Поиск' />
            </form>
        </div>
    );
}

export default Search;