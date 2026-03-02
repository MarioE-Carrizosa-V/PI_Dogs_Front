import { Link } from "react-router-dom";
import style from "./Card.module.css";

const Card = ({ id, name, image, temperament }) => {
  return (
    <div className={style.cardDisplay}>
      {" "}
      {name && (
        <Link to={`/dogs/${id}`} className={style.linkWrapper}>
          <div className={style.cards}>
            <h1 className={style.text}>{name}</h1>
            <img src={image} alt="" className={style.imagen} />
          </div>
        </Link>
      )}
    </div>
  );
};

export default Card;
