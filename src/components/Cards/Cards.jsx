import Card from '../Card/Card';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getByBreed, setPage } from '../../redux/action';
import style from './Cards.module.css';
import { useLocation } from 'react-router-dom';
import Paginate from '../Paginate/Paginate';

function Cards() {
  const dispatch = useDispatch();
  const location = useLocation();
  const dogs = useSelector(state => state.allDogs);
  const currentPage = useSelector(state => state.page);
  const elementsPerPage = 8; // Número de elementos por página

  useEffect(() => {
    dispatch(getByBreed());
  }, []);

  // Obtener los perros correspondientes a la página actual
  const startIndex = (currentPage - 1) * elementsPerPage;
  const endIndex = startIndex + elementsPerPage;
  const dogsToShow = dogs.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    dispatch(setPage(pageNumber));
  };

  return (
   <div>
    {location.pathname === '/dogs/' && <Paginate onPageChange={handlePageChange} />}
    <div className={style.cardDisplay}>
      {location.pathname === '/dogs/' &&
        dogsToShow.map(({ id, name, temperament, life_span, weight, height, image, Temperaments }) => {
          const newsTemperaments = temperament && temperament.includes(',') ? temperament.split(',') : temperament;
          return (
            <Card
              key={id}
              id={id}
              name={name}
              temperament={newsTemperaments || Temperaments}
              life_span={life_span}
              weight={weight ? weight : weight.metric}
              height={height ? height : height.metric}
              image={image.url ? image.url : image}
            />
          );
        })}
    </div>
    </div>
  );
}

export default Cards;
