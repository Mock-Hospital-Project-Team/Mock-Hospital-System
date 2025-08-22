from sqlalchemy import Column, Integer, String, TIMESTAMP
from database import Base

class Patient(Base):
    __tablename__ = "patients"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), nullable=False)
    age = Column(Integer, nullable=False)
    diagnosis = Column(String(50), nullable=False)
    created_at = Column(TIMESTAMP)
    updated_at = Column(TIMESTAMP)
