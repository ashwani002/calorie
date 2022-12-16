import Signup from "./componets/Signup";
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Userlist from "./componets/Userlist";
import Userdata from "./componets/Userdata";
import Userdetails from "./componets/Userdetails";
function App() {
  return ( <>
    <Router>
      <Routes>
        <Route element={<Signup/>} path='/signup'></Route>
        <Route element={<Userlist/>} path='/'></Route>
        <Route element={<Userdata/>} path='/view/:id'></Route>
        <Route element={<Userdetails/>} path='/view/userdetails/:id'></Route>
      </Routes>
    </Router>
  </> );
}

export default App;