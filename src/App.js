import './App.css';
import { useLocation} from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import Card from './components/Card/Card';
import Cards from './components/Cards/Cards';
import Detail from './components/Detail/Detail';
import Nav from './components/Nav/Nav';
import Form from './components/Form/Form';
import Homepage from './components/Homepage/Homepage';

function App() {
  const location = useLocation()

  return (
    <div className='App'>
        <Routes>
          <Route path='/dogs/' element={<Card/>} />
          <Route path='/dogs/:id' element={<Detail/>}/>
          <Route path='/dogs/search' element=''/>
          <Route path='/dogs/filter' element=''/>
          <Route path='/dogs/saveDog' element={<Form/>} />
          <Route path='/' element={<Homepage/>}/>
        </Routes>
        {location.pathname !== "/" && location.pathname !== '/dogs/saveDog' && <Nav/>}
      <Cards/>
    </div>
  );
}

export default App;
