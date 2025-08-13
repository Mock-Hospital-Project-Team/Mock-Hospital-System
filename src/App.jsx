import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import PatientList from "./components/PatientList";

function App() {
  return (
    <Routes>
      {/* 임시 Route들 구현해야함 */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/patients" element={<PatientList />} />
    </Routes>
  );
}

export default App;
