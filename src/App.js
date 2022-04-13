import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import ItemInfo from './components/ItemInfo/ItemInfo';
import RequireAuth from './components/RequireAuth/RequireAuth'
import ShowVideo from './components/ShowVideo/ShowVideo';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/foodInfo/:itemId' element={<ItemInfo />} />
        <Route path='/showVideo/:itemId' element={<RequireAuth>
          <ShowVideo />
        </RequireAuth>} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
