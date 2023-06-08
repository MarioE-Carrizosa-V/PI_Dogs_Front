import { Link, useParams } from "react-router-dom"
import { useEffect } from "react"
import style from './Detail.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { searchById } from '../../redux/action';




const Detail = () => {
    const { id } = useParams();
    let dogById = useSelector(state => state.DogsById)
        if(dogById.length) {
        dogById = dogById[0]
    }

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(searchById(id))
    }, [id]);
    
    return (
    <div className={style.cardDisplay}>
        <div>
        <Link to='/dogs/'> <button className={style.button}> Back </button> </Link>

        <Link to='/dogs/saveDog'> <button className={style.button}> Create Your Dog </button> </Link>

        <Link to={'/'}> <button className={style.button}> Exit </button> </Link>


                <h2 className={style.text}>{dogById.name}</h2>
                <img className={style.image} src={dogById.image} alt=''/>
                <p className={style.weight}>Weight in Kg: {dogById.weight}</p>
                <p className={style.height}>Height in cm: {dogById.height}</p>
                <p className={style.life}>Life span: {dogById.life_span}</p>
                <p className={style.temperament}>{dogById.Temperaments? dogById.Temperaments.map((temp) => '  *  ' +temp.temperament): dogById.temperament}</p>
        </div>
    </div>
    )
}

export default Detail