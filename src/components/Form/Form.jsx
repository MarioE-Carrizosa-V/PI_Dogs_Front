import { useState } from "react";
import { postDog } from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import validation from "./Validation";
import style from "./Form.module.css";
import { translations } from "../../utils/translations";

const Form = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lang = useSelector((state) => state.language);
  const t = translations[lang] || translations.ES;

  const [userData, setUserData] = useState({
    name: "",
    height: "",
    weight: "",
    life_span: "",
    traits: {
      energy: 3,
      trainability: 3,
      barking: 3,
      shedding: 3,
      protectiveness: 3,
    },
    image: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    height: "",
    weight: "",
    life_span: "",
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

  const handleTraitChange = (trait, value) => {
    setUserData({
      ...userData,
      traits: {
        ...userData.traits,
        [trait]: parseInt(value),
      },
    });
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
        // Trigger validation for image
        setErrors((prev) => ({
          ...prev,
          image: validation({ ...userData, image: reader.result }).image || "",
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(postDog(userData));
    alert("Perro creado con éxito (Vence en un mes)");
    navigate("/dogs/");
  };

  const traitOptions = [
    { key: "energy", label: t.trait_energy },
    { key: "trainability", label: t.trait_trainability },
    { key: "barking", label: t.trait_barking },
    { key: "shedding", label: t.trait_shedding },
    { key: "protectiveness", label: t.trait_protectiveness },
  ];

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

        <div className={style.row}>
          <div className={style.field}>
            <label className={style.form}> {t.form_height} (cm) </label>
            <input
              name="height"
              value={userData.height}
              onChange={handleInputChange}
              className={style.input}
              placeholder="E.j. 20 - 30"
            />
            {errors.height && <p className={style.alert}> {errors.height} </p>}
          </div>

          <div className={style.field}>
            <label className={style.form}> {t.form_weight} (kg) </label>
            <input
              name="weight"
              value={userData.weight}
              onChange={handleInputChange}
              className={style.input}
              placeholder="E.j. 10 - 15"
            />
            {errors.weight && <p className={style.alert}> {errors.weight} </p>}
          </div>
        </div>

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

        <div className={style.traitsContainer}>
          <h3 className={style.traitsTitle}>{t.filter_trait}</h3>
          <div className={style.traitsGrid}>
            {traitOptions.map((trait) => (
              <div key={trait.key} className={style.traitField}>
                <label className={style.traitLabel}>{trait.label}</label>
                <select
                  onChange={(e) => handleTraitChange(trait.key, e.target.value)}
                  value={userData.traits[trait.key]}
                  className={style.select}
                >
                  <option value="1">1 ({t.level_1})</option>
                  <option value="2">2 ({t.level_2})</option>
                  <option value="3">3 ({t.level_3})</option>
                  <option value="4">4 ({t.level_4})</option>
                  <option value="5">5 ({t.level_5})</option>
                </select>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className={style.button}
          disabled={
            Object.values(errors).some((error) => error !== "") ||
            !userData.image ||
            !userData.name ||
            !userData.height ||
            !userData.weight ||
            !userData.life_span
          }
        >
          {t.form_submit}
        </button>
      </form>
    </div>
  );
};

export default Form;
