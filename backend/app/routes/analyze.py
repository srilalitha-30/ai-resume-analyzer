from fastapi import APIRouter, UploadFile, File, Form
from app.services.analyzer import analyze_resume, extract_text_from_pdf

router = APIRouter()

@router.post("/")
async def analyze(
    file: UploadFile = File(...),
    role: str = Form(...)
):
    # Read file bytes
    file_bytes = await file.read()

    # Extract real text from PDF
    resume_text = extract_text_from_pdf(file_bytes)

    # Send clean text to AI
    result = analyze_resume(resume_text, role)

    return {
        "filename": file.filename,
        "role": role,
        "analysis": result
    }
