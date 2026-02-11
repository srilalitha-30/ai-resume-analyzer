from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from app.routes.analyze import router as analyze_router
import os

app = FastAPI(title="AI Resume Analyzer")

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

# ---- FRONTEND SERVING ----
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# 🔥 CHANGE THIS to your build folder
FRONTEND_BUILD_DIR = os.path.join(BASE_DIR, "..", "frontend", "dist")  
# OR "build" depending on your setup

# Serve static assets
app.mount("/static", StaticFiles(directory=FRONTEND_BUILD_DIR), name="static")

# Serve frontend index
@app.get("/")
async def serve_frontend():
    return FileResponse(os.path.join(FRONTEND_BUILD_DIR, "index.html"))
