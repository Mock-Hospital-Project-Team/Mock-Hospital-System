from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# MySQL 계정 정보 (앞서 만든 계정 사용)
USERNAME = "myuser"        # 앱용 계정
PASSWORD = "mypassword"
HOST = "localhost"
PORT = "3306"
DB_NAME = "mock_hospital"

DATABASE_URL = f"mysql+pymysql://{USERNAME}:{PASSWORD}@{HOST}:{PORT}/{DB_NAME}"

# SQLAlchemy 엔진 생성
engine = create_engine(DATABASE_URL, echo=True)

# 세션 생성
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 베이스 클래스 (모델 정의용)
Base = declarative_base()
