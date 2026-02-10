from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from app.routes.analyze import router as analyze_router
import os
import uvicorn

app = FastAPI(title="AI Resume Analyzer")

# API routes
app.include_router(analyze_router, prefix="/api", tags=["Analyzer"])

# CORS (safe even if not needed later)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve frontend build
STATIC_DIR = os.path.join(os.path.dirname(__file__), "static")

app.mount("/", StaticFiles(directory=STATIC_DIR, html=True), name="static")

@app.get("/")
def serve_frontend():
    return FileResponse(os.path.join(STATIC_DIR, "index.html"))

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("app.main:app", host="0.0.0.0", port=port)
