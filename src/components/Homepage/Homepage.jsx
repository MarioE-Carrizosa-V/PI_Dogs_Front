import { Link } from "react-router-dom";
import style from "./Homepage.module.css";
import { useSelector } from "react-redux";
import { translations } from "../../utils/translations";

const Homepage = () => {
  const lang = useSelector((state) => state.language);
  const t = translations[lang] || translations.ES;

  return (
    <div className={style.background}>
      <h1 className={style.title}>
        {" "}
        {t.home_title}: <br /> <br />
        {t.home_subtitle}{" "}
      </h1>
      <img
        alt=""
        src="https://cdn.superaficionados.com/imagenes/koromaru.gif"
        className={style.image}
      />
      <Link to="/dogs/">
        <button className={style.button}>{t.start_button}</button>
      </Link>
    </div>
  );
};

export default Homepage;
