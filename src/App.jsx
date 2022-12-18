import './App.css';
import { useGlobalContext } from './Context';
import Favorites from './components/Favorites';
import Meals from './components/Meals';
import Search from './components/Search';
import Modal from './components/Modal';

function App() {
  const {showModal,favotites} = useGlobalContext();
  return (
    <div className="App">
      <Search/>
      {favotites.length > 0 && <Favorites/> }
      <Meals/>
      {showModal && <Modal/>}
      
    </div>
  );
}

export default App;
