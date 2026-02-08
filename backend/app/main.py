from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.analyze import router as analyze_router
import os
import uvicorn

app = FastAPI(title="AI Resume Analyzer API")

# CORS (allow frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # dev only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def health_check():
    return {"status": "Backend is running"}

app.include_router(analyze_router, prefix="/analyze", tags=["Analyzer"])


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))   # Render provides PORT
    uvicorn.run("main:app", host="0.0.0.0", port=port)
