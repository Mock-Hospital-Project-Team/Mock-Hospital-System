import React, { useState, useEffect } from "react";
import PatientForm from "./PatientForm";

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");

  // FastAPI에서 환자 데이터 가져오기
  const fetchPatients = () => {
    fetch("http://localhost:8000/patients")
      .then((res) => res.json())
      .then((data) => setPatients(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  // 새 환자 추가 시 목록 갱신
  const handleAddPatient = (patient) => {
    setPatients((prev) => [...prev, patient]);
  };

  const filteredPatients = patients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>환자 목록</h2>

      {/* 환자 등록 폼 */}
      <PatientForm onAdd={handleAddPatient} />

      <input
        type="text"
        placeholder="환자 이름 검색"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "8px",
          marginBottom: "10px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          width: "200px",
        }}
      />

      <table border="1" cellPadding="10" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>이름</th>
            <th>나이</th>
            <th>진단</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.length > 0 ? (
            filteredPatients.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.id}</td>
                <td>{patient.name}</td>
                <td>{patient.age}</td>
                <td>{patient.diagnosis}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                검색 결과가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PatientList;
