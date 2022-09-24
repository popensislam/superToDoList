import searchIcon from '../../assets/search.svg'
import './search.css'

const Search = () => {
    return ( 
        <div className='search'>
            <img src={searchIcon} alt='searchs icon'/>
            <input type='text' placeholder='Поиск'/>
        </div>
     );
}
 
export default Search;