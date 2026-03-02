import { useState, useEffect } from "react";
import { postDog, getByTemperament } from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import validation from "./Validation";
import style from "./Form.module.css";
import { translations } from "../../utils/translations";

const Form = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const temperaments = useSelector((state) => state.DogsByTemperament);
  const lang = useSelector((state) => state.language);
  const t = translations[lang] || translations.ES;

  useEffect(() => {
    dispatch(getByTemperament());
  }, [dispatch]);

  const [userData, setUserData] = useState({
    name: "",
    height: "",
    weight: "",
    life_span: "",
    temperament: [],
    image: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    height: "",
    weight: "",
    life_span: "",
    temperament: "",
    image: "",
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleBack = () => {
    navigate("/dogs/");
  };

  const handleInputChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
    setErrors(
      validation({
        ...userData,
        [event.target.name]: event.target.value,
      }),
    );
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData({
          ...userData,
          image: reader.result,
        });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectChange = (event) => {
    const selectedId = event.target.value;
    const tempObj = temperaments.find((t) => t.id === parseInt(selectedId));

    if (tempObj && !userData.temperament.includes(tempObj.temperament)) {
      setUserData({
        ...userData,
        temperament: [...userData.temperament, tempObj.temperament],
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Convert array of temperament strings to the string format expected by Cards component
    const submissionData = {
      ...userData,
      temperament: userData.temperament.join(", "),
    };

    dispatch(postDog(submissionData));
    alert("Perro creado con éxito (Vence en un mes)");
    navigate("/dogs/");
  };

  return (
    <div className={style.background}>
      <button className={style.buttonBack} onClick={handleBack}>
        {t.form_back}
      </button>

      <form onSubmit={handleSubmit} className={style.formContainer}>
        <h2 className={style.form}> {t.form_title} </h2>

        <div className={style.imageUploadSection}>
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className={style.preview} />
          )}
          <label className={style.fileLabel}>
            Seleccionar Imagen
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={style.fileInput}
            />
          </label>
        </div>

        <label className={style.form}> {t.form_name} </label>
        <input
          name="name"
          value={userData.name}
          onChange={handleInputChange}
          className={style.input}
        />
        {errors.name && <p className={style.alert}> {errors.name} </p>}

        <label className={style.form}> {t.form_height} </label>
        <input
          name="height"
          value={userData.height}
          onChange={handleInputChange}
          className={style.input}
          placeholder="E.j. 20 - 30"
        />
        {errors.height && <p className={style.alert}> {errors.height} </p>}

        <label className={style.form}> {t.form_weight} </label>
        <input
          name="weight"
          value={userData.weight}
          onChange={handleInputChange}
          className={style.input}
          placeholder="E.j. 10 - 15"
        />
        {errors.weight && <p className={style.alert}> {errors.weight} </p>}

        <label className={style.form}> {t.form_life} </label>
        <input
          name="life_span"
          value={userData.life_span}
          onChange={handleInputChange}
          className={style.input}
          placeholder="E.j. 12 - 15"
        />
        {errors.life_span && (
          <p className={style.alert}> {errors.life_span} </p>
        )}

        <label className={style.form}> {t.detail_temperament} </label>
        <select onChange={handleSelectChange} className={style.select}>
          <option value="">Seleccionar</option>
          {temperaments.map((temp) => (
            <option key={temp.id} value={temp.id}>
              {temp.temperament}
            </option>
          ))}
        </select>
        <div className={style.selectedTemps}>
          {userData.temperament.map((temp, index) => (
            <span key={index} className={style.tempBadge}>
              {temp}
            </span>
          ))}
        </div>

        <button
          type="submit"
          className={style.button}
          disabled={
            Object.values(errors).some((error) => error !== "") ||
            !userData.image
          }
        >
          {t.form_submit}
        </button>
      </form>
    </div>
  );
};

export default Form;
