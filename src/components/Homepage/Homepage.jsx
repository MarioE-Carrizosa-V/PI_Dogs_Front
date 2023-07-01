import { Link } from 'react-router-dom'
import style from '../Homepage/Homepage.module.css'

const Homepage = () => {

    return (

        
        <div  className={style.background}>
            <h1 className={style.title}> Canine Encyclopedia: <br/> <br/>
            Discover Dog Breeds </h1>
            <img alt='' src='https://cdn.superaficionados.com/imagenes/koromaru.gif' className={style.image}/>
            <br/> <br/>
            <Link to='/dogs/'>
                <button className={style.button}>
                    Start
                </button> </Link>
        </div>
    )
}

export default Homepage