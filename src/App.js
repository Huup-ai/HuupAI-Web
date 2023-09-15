import "./App.css";
import Clouds from "./pages/Clouds/Clouds";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import GPU from './pages/GPU';
import ConfirmationGPU from './pages/Confirmation_GPU';
import Login from "./pages/Login/Login";

function App() {
  return (

    
    <div className="App">

        <div className="blur" style={{top: '-18%', right: '0'}}></div>
        <div className="blur" style={{top: '36%', left: '-8rem'}}></div>
        
        {/* <Login/> */}
        <Clouds/>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/GPU" element={<GPU />} />
            <Route path="/confirmation/:id" element={<ConfirmationGPU />} />
        {/* ... other routes if you have any */}
          </Routes>
        </Router>

    </div>
  );
}

export default App;
