import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp({ accounts, setAccounts }) {
  const [formData, setFormData] = useState({ email: "", password: "", confirm: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, confirm } = formData;

    if (!email || !password || !confirm) {
      alert("모든 필드를 입력해주세요.");
      return;
    }
    if (password !== confirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (accounts.find((acc) => acc.email === email)) {
      alert("이미 존재하는 이메일입니다.");
      return;
    }

    setAccounts([...accounts, { email, password }]);
    alert("회원가입 성공!");
    navigate("/login");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>이메일: </label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>비밀번호: </label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>비밀번호 확인: </label>
          <input type="password" name="confirm" value={formData.confirm} onChange={handleChange} />
        </div>
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}
