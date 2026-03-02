import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getByName,
  getByTemperament,
  orderDogs,
  filterDogsFrom,
  getByBreed,
  setLanguage,
  filterByTrait,
  resetFilters,
  loadLocalDogs,
} from "../../redux/action";
import { useParams, Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { translations } from "../../utils/translations";
import style from "../Nav/Nav.module.css";

const Nav = () => {
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.language);
  const filters = useSelector((state) => state.filters);
  const t = translations[lang] || translations.ES;
  const { name } = useParams();

  const handleOrder = (event) => {
    dispatch(orderDogs(event.target.value));
  };

  const handleFilterFrom = (event) => {
    dispatch(filterDogsFrom(event.target.value));
  };

  const handleLanguage = (event) => {
    dispatch(setLanguage(event.target.value));
  };

  const handleTraitChange = (trait, event) => {
    dispatch(filterByTrait(trait, event.target.value));
  };

  useEffect(() => {
    dispatch(getByTemperament());
    dispatch(loadLocalDogs()); // Load local dogs on mount
    if (name) dispatch(getByName(name));
  }, [dispatch, name]);

  const handleSearch = (searchQuery) => {
    dispatch(getByName(searchQuery));
  };

  const handleButtonClick = () => {
    dispatch(getByBreed());
    dispatch(resetFilters());
  };

  const traitOptions = [
    { key: "energy", label: t.trait_energy },
    { key: "trainability", label: t.trait_trainability },
    { key: "barking", label: t.trait_barking },
    { key: "shedding", label: t.trait_shedding },
    { key: "protectiveness", label: t.trait_protectiveness },
  ];

  return (
    <nav className={style.nav}>
      <div className={style.topRow}>
        <select onChange={handleLanguage} value={lang} className={style.select}>
          <option value="ES">Español</option>
          <option value="EN">English</option>
        </select>

        <Link to="/dogs/">
          <button className={style.button} onClick={() => handleButtonClick()}>
            {" "}
            {t.nav_home}{" "}
          </button>
        </Link>

        <select onChange={handleOrder} className={style.select}>
          <option value="">{t.order_alpha}</option>
          <option value="A">{t.order_asc}</option>
          <option value="D">{t.order_desc}</option>
        </select>

        <select onChange={handleFilterFrom} className={style.select}>
          <option value="All"> {t.filter_source}</option>
          <option value="DB">{t.source_db}</option>
          <option value="API">{t.source_api}</option>
        </select>

        <Link to="/dogs/saveDog">
          {" "}
          <button className={style.button}> {t.nav_create} </button>{" "}
        </Link>

        <SearchBar onSearch={handleSearch} />
      </div>

      <div className={style.filterRow}>
        {traitOptions.map((trait) => (
          <div key={trait.key} className={style.filterGroup}>
            <label className={style.label}>{trait.label}</label>
            <select
              onChange={(e) => handleTraitChange(trait.key, e)}
              value={filters[trait.key]}
              className={style.selectSmall}
            >
              <option value="All">{t.filter_level}</option>
              <option value="1">1 ({t.level_1})</option>
              <option value="2">2 ({t.level_2})</option>
              <option value="3">3 ({t.level_3})</option>
              <option value="4">4 ({t.level_4})</option>
              <option value="5">5 ({t.level_5})</option>
            </select>
          </div>
        ))}
        <button
          className={style.button}
          onClick={() => dispatch(resetFilters())}
        >
          {t.reset_filters}
        </button>
      </div>
    </nav>
  );
};

export default Nav;
