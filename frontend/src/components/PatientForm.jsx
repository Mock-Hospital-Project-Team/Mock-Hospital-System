import React, { useState } from "react";

const PatientForm = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [diagnosis, setDiagnosis] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !age || !diagnosis) return;

    const newPatient = { name, age: parseInt(age), diagnosis };

    try {
      const res = await fetch("http://localhost:8000/patients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPatient),
      });

      const data = await res.json();
      onAdd(data);  // 부모 컴포넌트로 새 환자 전달
      setName("");
      setAge("");
      setDiagnosis("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginRight: "10px" }}
      />
      <input
        type="number"
        placeholder="나이"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        style={{ marginRight: "10px" }}
      />
      <input
        type="text"
        placeholder="진단"
        value={diagnosis}
        onChange={(e) => setDiagnosis(e.target.value)}
        style={{ marginRight: "10px" }}
      />
      <button type="submit">등록</button>
    </form>
  );
};

export default PatientForm;
