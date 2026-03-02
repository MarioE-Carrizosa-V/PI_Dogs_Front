import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearDetail, searchById } from "../../redux/action";
import style from "./Detail.module.css";
import { translations } from "../../utils/translations";

const Detail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const dog = useSelector((state) => state.DogsById);
  const lang = useSelector((state) => state.language);
  const t = translations[lang] || translations.ES;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    dispatch(searchById(id)).then(() => setLoading(false));

    return () => {
      dispatch(clearDetail());
    };
  }, [id, dispatch]);

  const handleBack = () => {
    navigate("/dogs/");
  };

  if (loading)
    return (
      <div className={style.loader}>
        <h2>{t.loading}</h2>
      </div>
    );

  return (
    <div className={style.cardDisplay}>
      {dog && (
        <div>
          <button className={style.button} onClick={handleBack}>
            {" "}
            {t.form_back}{" "}
          </button>
          <h2 className={style.text}> {dog.name} </h2>
          <img src={dog.image} alt="" className={style.image} />
          <h3 className={style.weight}>
            {" "}
            {t.detail_weight}: {dog.weight}{" "}
          </h3>
          <h3 className={style.height}>
            {" "}
            {t.detail_height}: {dog.height}{" "}
          </h3>
          <h3 className={style.life}>
            {" "}
            {t.detail_life}: {dog.life_span}{" "}
          </h3>

          {dog.traits ? (
            <div className={style.traitsContainer}>
              <h3 className={style.traitsTitle}>{t.detail_traits}</h3>
              <div className={style.traitsGrid}>
                <div className={style.traitItem}>
                  <span>{t.trait_energy}:</span>{" "}
                  <strong>{dog.traits.energy}</strong>
                </div>
                <div className={style.traitItem}>
                  <span>{t.trait_trainability}:</span>{" "}
                  <strong>{dog.traits.trainability}</strong>
                </div>
                <div className={style.traitItem}>
                  <span>{t.trait_barking}:</span>{" "}
                  <strong>{dog.traits.barking}</strong>
                </div>
                <div className={style.traitItem}>
                  <span>{t.trait_shedding}:</span>{" "}
                  <strong>{dog.traits.shedding}</strong>
                </div>
                <div className={style.traitItem}>
                  <span>{t.trait_protectiveness}:</span>{" "}
                  <strong>{dog.traits.protectiveness}</strong>
                </div>
              </div>
            </div>
          ) : dog.temperament ? (
            <h3 className={style.temperament}>
              {" "}
              {t.detail_temperament}: {dog.temperament}{" "}
            </h3>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Detail;
