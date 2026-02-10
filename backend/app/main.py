from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from app.routes.analyze import router as analyze_router
import os

app = FastAPI(title="AI Resume Analyzer API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API routes
app.include_router(analyze_router, prefix="/api/analyze", tags=["Analyzer"])

# ---------- FRONTEND SERVING ----------

BASE_DIR = os.path.dirname(__file__)
FRONTEND_PATH = os.path.join(BASE_DIR, "..", "frontend")

# Serve ALL frontend files (images, js, css, assets)
app.mount("/assets", StaticFiles(directory=FRONTEND_PATH), name="assets")

# React entry point
@app.get("/")
def serve_frontend():
    return FileResponse(os.path.join(FRONTEND_PATH, "index.html"))
