import { useState } from "react";
import { useSelector } from "react-redux";
import { translations } from "../../utils/translations";
import style from "./SearchBar.module.css";

export default function SearchBar({ onSearch }) {
  const [name, setName] = useState("");
  const lang = useSelector((state) => state.language);
  const t = translations[lang] || translations.ES;

  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div className={style.searchContainer}>
      <input
        type="search"
        onChange={handleChange}
        value={name}
        className={style.search}
        placeholder={t.search_placeholder}
      />
      <button
        onClick={() => {
          onSearch(name);
          setName("");
        }}
        className={style.button}
      >
        {" "}
        {t.search_button}{" "}
      </button>
    </div>
  );
}
