import "./App.css";

import { Routes, Route } from "react-router-dom";

import LogIn from "./pages/Login/LogIn";
import Profile from "./pages/Home/Profile";
import Navigation from "./components/Navigation";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
