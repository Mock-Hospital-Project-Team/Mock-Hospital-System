import { useState } from "react";
import { Routes, Route, Navigate, useNavigate, Link } from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import PatientList from "./components/PatientList";
import PatientForm from "./components/PatientForm";
import PatientDetail from "./components/PatientDetail";

function App() {
  const [accounts, setAccounts] = useState([]);
  const [user, setUser] = useState(null); // 로그인 상태
  const [patients, setPatients] = useState([]);
  const [nextId, setNextId] = useState(1);
  const navigate = useNavigate();

  // 환자 등록
  const addPatient = (patient) => {
    const today = new Date().toISOString().split("T")[0];
    const newPatient = { ...patient, id: nextId, createdAt: today, updatedAt: today };
    setPatients([...patients, newPatient]);
    setNextId(nextId + 1);
    navigate("/patients");
  };

  // 환자 수정
  const updatePatient = (updated) => {
    const today = new Date().toISOString().split("T")[0];
    setPatients(patients.map((p) => (p.id === updated.id ? { ...updated, updatedAt: today } : p)));
    navigate("/patients");
  };

  // 환자 삭제
  const deletePatient = (id) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      setPatients(patients.filter((p) => p.id !== id));
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Mock Hospital System</h1>
      <nav style={{ marginBottom: "20px" }}>
        <Link to="/" style={{ marginRight: "10px" }}>홈</Link>
        {!user && <Link to="/login" style={{ marginRight: "10px" }}>로그인</Link>}
        {!user && <Link to="/signup" style={{ marginRight: "10px" }}>회원가입</Link>}
        {user && <Link to="/patients" style={{ marginRight: "10px" }}>환자 목록</Link>}
        {user && <Link to="/patients/new" style={{ color: "green" }}>+ 환자 등록</Link>}
        {user && (
          <button
            onClick={() => {
              setUser(null);
              navigate("/login");
            }}
            style={{ marginLeft: "10px" }}
          >
            로그아웃
          </button>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp accounts={accounts} setAccounts={setAccounts} />} />
        <Route path="/login" element={<Login accounts={accounts} setUser={setUser} />} />
        <Route
          path="/patients"
          element={user ? <PatientList patients={patients} onDelete={deletePatient} /> : <Navigate to="/login" />}
        />
        <Route
          path="/patients/new"
          element={user ? <PatientForm onSubmit={addPatient} /> : <Navigate to="/login" />}
        />
        <Route
          path="/patients/:id"
          element={user ? <PatientDetail patients={patients} /> : <Navigate to="/login" />}
        />
        <Route
          path="/patients/:id/edit"
          element={user ? <PatientForm patients={patients} onSubmit={updatePatient} /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
}

export default App;
