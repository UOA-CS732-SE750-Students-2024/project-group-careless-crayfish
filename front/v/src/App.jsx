
import {Route, Routes } from "react-router-dom";
import Login from './login';
import Dashboard from './dashboard';

function App() {
  return (
    <Routes>
     <Route path="/" element={<Login/>}/>
     <Route path="/dashboard" element={<Dashboard/>}/>
    </Routes>
  );
}

export default App;
