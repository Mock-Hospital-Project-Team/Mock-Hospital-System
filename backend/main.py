from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime

# 테이블 생성
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS 설정 (React dev 서버 허용)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React dev 주소
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# DB 세션 의존성
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Pydantic 모델
class PatientSchema(BaseModel):
    name: str
    age: int
    diagnosis: str

    class Config:
        orm_mode = True

# 전체 환자 조회
@app.get("/patients")
def read_patients(db: Session = Depends(get_db)):
    return db.query(models.Patient).all()

# 환자 등록
@app.post("/patients")
def create_patient(patient: PatientSchema, db: Session = Depends(get_db)):
    new_patient = models.Patient(
        name=patient.name,
        age=patient.age,
        diagnosis=patient.diagnosis,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.add(new_patient)
    db.commit()
    db.refresh(new_patient)
    return new_patient
