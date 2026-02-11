from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from app.routes.analyze import router as analyze_router
import os

app = FastAPI(title="AI Resume Analyzer")

# ---------------- CORS ----------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- API ROUTES ----------------
app.include_router(analyze_router, prefix="/api/analyze", tags=["Analyzer"])

# ---------------- FRONTEND SERVING ----------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Correct path:
# backend/app/main.py -> ../../frontend/build
FRONTEND_BUILD_DIR = os.path.abspath(
    os.path.join(BASE_DIR, "..", "..", "frontend", "build")
)

# Static assets
app.mount(
    "/static",
    StaticFiles(directory=os.path.join(FRONTEND_BUILD_DIR, "static")),
    name="static"
)

# React app
@app.get("/")
async def serve_frontend():
    return FileResponse(os.path.join(FRONTEND_BUILD_DIR, "index.html"))
