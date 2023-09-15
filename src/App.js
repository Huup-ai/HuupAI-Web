import "./App.css";
import Clouds from "./pages/Clouds/Clouds";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GPU from './pages/GPU';
import Confirmation_GPU from './pages/Confirmation_GPU';

import Login from "./pages/Login/Login";

function App() {
  return (

    
    <div className="App">
<<<<<<< HEAD
        <div className="blur" style={{top: '-18%', right: '0'}}></div>
        <div className="blur" style={{top: '36%', left: '-8rem'}}></div>
        
        {/* <Login/> */}
        <Clouds/>
        <Router>
          <Routes>
            <Route path="/GPU" element={<GPU />} />
            <Route path="/confirmation/:id" element={<Confirmation_GPU />} />
        {/* ... other routes if you have any */}
          </Routes>
        </Router>
=======
      <div className="blur" style={{ top: "-18%", right: "0" }}></div>
      <div className="blur" style={{ top: "36%", left: "-8rem" }}></div>
      <Login />

      {/* <Clouds/> */}
>>>>>>> kathy
    </div>
  );
}

export default App;
