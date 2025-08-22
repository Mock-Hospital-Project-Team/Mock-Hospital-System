import { useParams, Link } from "react-router-dom";

export default function PatientDetail({ patients }) {
  const { id } = useParams(); // URL에서 id 가져오기
  const patient = patients.find((p) => p.id === Number(id));

  if (!patient) return <h2>❌ 환자를 찾을 수 없습니다.</h2>;

  return (
    <div>
      <h2>환자 상세 정보</h2>
      <p><strong>이름:</strong> {patient.name}</p>
      <p><strong>나이:</strong> {patient.age}</p>
      <p><strong>진단:</strong> {patient.diagnosis}</p>

      <Link to={`/patients/${patient.id}/edit`} style={{ marginRight: "10px" }}>
        수정
      </Link>
      <Link to="/patients">목록으로</Link>
    </div>
  );
}
