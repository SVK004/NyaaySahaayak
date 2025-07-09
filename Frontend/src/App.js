import LoginPage from './components/LoginPage/LoginPage.jsx';
import Home from './components/home/home.jsx';
import { BrowserRouter as Path, Route, Routes } from 'react-router-dom'
import PasswordChange from './components/passwordChange/PasswordChange.jsx';

function App() {
   return (
         <Path>
            <Routes>

               <Route exact path='/' element={<LoginPage />} />
               <Route exact path='/home' element={<Home/>} />
               <Route exact path='/pschange' element={<PasswordChange />}/>
            </Routes>
         </Path>
   );
}

export default App;
