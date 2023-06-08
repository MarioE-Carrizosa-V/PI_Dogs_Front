import { useState } from "react"
import style from './SearchBar.module.css'


export default function SearchBar({onSearch}) {
   const [name, setName] = useState("");

   const handleChange = (event) => {
      setName(event.target.value)
   }

   return (

      <div>
         <input type='search' onChange={handleChange} value={name} className={style.search} placeholder="Search dog by name"/>
         <button onClick={() => {onSearch(name); setName("")}} className={style.button}> Buscar </button>
      </div>
   );

}