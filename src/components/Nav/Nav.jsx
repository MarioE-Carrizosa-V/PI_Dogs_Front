import { useDispatch, useSelector } from "react-redux";
import { useEffect} from "react";
import { getByName, getByTemperament, orderDogs, filterDogs, filterDogsFrom, getByBreed } from "../../redux/action";
import { useParams, Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import style from '../Nav/Nav.module.css'

 const Nav = () => {

    const dispatch = useDispatch();
    const temperaments = useSelector(state => state.DogsByTemperament)
    const { name } = useParams();

    const handleOrder = (event) => {
        dispatch(orderDogs(event.target.value))
    }

    const handleFilter = (event) => {
        dispatch(filterDogs(event.target.value))
    }

    const handleFilterFrom = (event) => {
      dispatch(filterDogsFrom(event.target.value))

    }

    useEffect(() => {
        dispatch(getByTemperament())
        if(name)
        dispatch(getByName(name))
    }, [])

    const handleSearch = (searchQuery) => {
        dispatch(getByName(searchQuery))
      };
      
      const handleButtonClick = () => {
        dispatch(getByBreed());
      };
      
    return(

        <nav>
            <button className={style.button} onClick={() => handleButtonClick()} > All Dogs </button>  

            <select onChange={handleOrder} className={style.select}>
                <option>Order By</option>
                <option value="A">Ascendant</option>
                <option value="D">Falling</option>
            </select>

            <select onChange={handleFilter} className={style.select}>
                <option>Filter By</option>
                    {temperaments.map(({temperament, id}) => (
                    <option key={id} value={temperament}>{temperament}</option>
                ))}
            </select>

            <select onChange={handleFilterFrom} className={style.select}>
                <option> Filter From</option>
                <option value="DB">FromDB</option>
                <option value="API">FromAPI</option>
            </select>
                
            <Link to='/dogs/saveDog'> <button className={style.button}> Create Your Dog </button> </Link>

            <Link to='/'> <button className={style.button}> Exit </button> </Link>
                
            <SearchBar onSearch={handleSearch}/>
                                        
        </nav>
        
    )       

}

export default Nav;