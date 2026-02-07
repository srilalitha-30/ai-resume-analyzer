# AI Resume Analyzer 🚀

A full-stack AI-powered resume analysis system that evaluates resumes against job roles and provides skill gap analysis, project recommendations, and personalized learning roadmaps.

## Tech Stack

Frontend:
- React
- Tailwind CSS
- Axios

Backend:
- FastAPI
- Python
- REST APIs
- Uvicorn

## Features
- Resume upload
- Role-based analysis
- Skill gap detection
- Project recommendations
- Learning roadmap
- Spelling mistake detection
- REST API integration

## Project Structure
frontend → React UI  
backend → FastAPI server  

## API
POST /analyze?role=role_name

Input: PDF resume  
Output: JSON response with skills, projects, roadmap

## Local Setup

Backend:
cd backend  
python -m venv venv  
source venv/bin/activate  
pip install -r requirements.txt  
uvicorn app.main:app --reload  

Frontend:
cd frontend  
npm install  
npm run dev  

## Author
Lalli

