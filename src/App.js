import './App.css';
import { Route, Routes } from 'react-router-dom'
import Navbar from './Navbar';
import About from './about/About';
import Login from './login/LogIn';
import Register from './register/Register';


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<About />} />
        <Route path='/about/About' element={<About />} />
        <Route path='/login/LogIn' element={<Login />} />
        <Route path='/register/Register' element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
