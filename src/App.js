
import "./App.css"
import Clouds from "./pages/Clouds/Clouds";
import Login from "./pages/Login/Login";

function App() {
  return (
    <div className="App">
        <div className="blur" style={{top: '-18%', right: '0'}}></div>
        <div className="blur" style={{top: '36%', left: '-8rem'}}></div>
        
        {/* <Login/> */}
        <Clouds/>
    </div>
  );
}

export default App;
