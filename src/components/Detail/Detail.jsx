import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import style from './Detail.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { searchById, clearDetail} from '../../redux/action';
import { MutatingDots } from  'react-loader-spinner'

const Detail = () => {

    let dogById = useSelector(state => state.DogsById)
    const [loading, setLoading] = useState(true); // Estado para controlar la carga
    const { id } = useParams();
    const dispatch = useDispatch()

        useEffect(() => {
            if(dogById?.length) {
            setLoading(false); 
        } else {
            const loadData = async () => {

                setLoading(true)
                await dispatch(clearDetail());
                await dispatch(searchById(id))
                setLoading(false);
            }
            loadData()
        }
        }, [id]);

        if(dogById?.length) {
        dogById = dogById[0]
    }
        if (loading) {
      return (
      <div className={style.cardDisplay}>
        <MutatingDots   height="100" width="100" color="gray" secondaryColor= 'white' radius='20' ariaLabel="mutating-dots-loading" wrapperClass={style.loader} />
      </div>// Muestra el mensaje de carga mientras loadinges true
    )}

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