import './App.css';
// Screens
import Home from './screens/Home';
import Detail from './screens/Detail';
import Edit from './screens/Edit';
// Router
import { Routes, Route } from "react-router-dom"

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/edit" element={<Edit />} />
      </Routes>
    </div>
  );
}

export default App;
