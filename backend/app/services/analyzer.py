from pypdf import PdfReader
from io import BytesIO
import requests
import json

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "llama3"   # or qwen3:4b / qwen3:8b if system can handle it


# ==============================
# PDF TEXT EXTRACTOR
# ==============================
def extract_text_from_pdf(file_bytes: bytes) -> str:
    try:
        reader = PdfReader(BytesIO(file_bytes))
        text = ""
        for page in reader.pages:
            extracted = page.extract_text()
            if extracted:
                text += extracted + "\n"
        return text.strip()
    except Exception:
        return ""


# ==============================
# AI ANALYZER
# ==============================
def analyze_resume(resume_text: str, role: str):
    if not resume_text.strip():
        return {
            "error": True,
            "details": "Empty resume text after PDF extraction"
        }

    prompt = f"""
You are an ATS resume analyzer system.

Return ONLY valid JSON.
NO text.
NO markdown.
NO explanations.
NO formatting.
NO comments.
NO backticks.

STRICT SCHEMA:

{{
  "score": 0-100,
  "strengths": ["...", "...", "..."],
  "weaknesses": ["...", "...", "..."],
  "improvements": ["...", "...", "..."]
}}

Rules:
- score must be NUMBER
- arrays must have 3 strings each
- no empty arrays
- no null
- no extra text

Job Role: {role}

Resume:
{resume_text}
"""

    try:
        response = requests.post(
            OLLAMA_URL,
            json={
                "model": MODEL_NAME,
                "prompt": prompt,
                "stream": False,
                "format": "json"   # 🔥 forces structured output
            },
            timeout=180
        )

        data = response.json()
        raw = data.get("response", "")

        if not raw:
            return {
                "error": True,
                "details": "Empty response from AI"
            }

        # ------------------------------
        # SAFE JSON EXTRACTION
        # ------------------------------
        start = raw.find("{")
        end = raw.rfind("}")

        if start == -1 or end == -1:
            return {
                "error": True,
                "details": "No JSON structure in AI response",
                "ai_raw": raw
            }

        json_str = raw[start:end+1]

        try:
            parsed = json.loads(json_str)
        except Exception as e:
            return {
                "error": True,
                "details": f"JSON parse error: {str(e)}",
                "ai_raw": json_str
            }

        # ------------------------------
        # SCHEMA VALIDATION
        # ------------------------------
        required_keys = ["score", "strengths", "weaknesses", "improvements"]

        for k in required_keys:
            if k not in parsed:
                return {
                    "error": True,
                    "details": f"Missing key in AI JSON: {k}",
                    "ai_raw": parsed
                }

        return {
            "error": False,
            "result": parsed
        }

    except requests.exceptions.ConnectionError:
        return {
            "error": True,
            "details": "Ollama not running on localhost:11434"
        }

    except requests.exceptions.Timeout:
        return {
            "error": True,
            "details": "Ollama timeout (model too slow or overloaded)"
        }

    except Exception as e:
        return {
            "error": True,
            "details": f"Unexpected error: {str(e)}"
        }
