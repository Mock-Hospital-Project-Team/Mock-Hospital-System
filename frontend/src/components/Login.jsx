import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ accounts, setUser }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const account = accounts.find(
      (acc) => acc.email === formData.email && acc.password === formData.password
    );

    if (account) {
      alert("로그인 성공!");
      setUser(account);
      navigate("/patients");
    } else {
      alert("이메일 또는 비밀번호가 틀립니다.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>이메일: </label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>비밀번호: </label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}
