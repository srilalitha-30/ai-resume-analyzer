import { useState } from "react";
import api from "../api";   // ✅ changed (axios instance)
import ResultCard from "../components/ResultCard";

export default function Analyzer() {
  const [file, setFile] = useState(null);
  const [role, setRole] = useState("");
  const [customRole, setCustomRole] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const finalRole = role === "other" ? customRole : role;

  const handleAnalyze = async () => {
    if (!file || !finalRole) {
      alert("Please upload resume and select a role");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("role", finalRole);

    try {
      setLoading(true);

      const res = await api.post(
  `/api/analyze`,
  formData,
  {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }
);

      const data = res.data;

      setResult(data.analysis);   // ✅ unchanged logic

    } catch (error) {
      console.error("API Error:", error);

      if (error.response) {
        alert(
          `Backend error ${error.response.status}: ${
            error.response.data?.detail ||
            error.response.data?.error ||
            "Check backend logs"
          }`
        );
      } else {
        alert("Cannot reach backend. Server not responding.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <h1 className="text-4xl font-bold text-center mb-14">
        AI Resume Analyzer
      </h1>

      {/* TOP INFO BOXES */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

          {/* SKILLS */}
          <div className="bg-white p-10 rounded-3xl shadow flex items-center gap-6 h-full">
            <img
              src="/skill.png"
              alt="Skills"
              className="w-20 h-20 p-3 border border-blue-300 rounded-xl shrink-0"
            />
            <div>
              <h3 className="text-xl font-semibold mb-2">Skill Analysis</h3>
              <p className="text-gray-600 text-base leading-relaxed">
                Analyze required technical and soft skills for your selected role.
              </p>
            </div>
          </div>

          {/* ROADMAP */}
          <div className="bg-white p-10 rounded-3xl shadow flex items-center gap-6 h-full">
            <img
              src="/roadmap.png"
              alt="Roadmap"
              className="w-20 h-20 p-3 border border-blue-300 rounded-xl shrink-0"
            />
            <div>
              <h3 className="text-xl font-semibold mb-2">Learning Roadmap</h3>
              <p className="text-gray-600 text-base leading-relaxed">
                Clear step-by-step guidance to grow your career path.
              </p>
            </div>
          </div>

          {/* PROJECTS */}
          <div className="bg-white p-10 rounded-3xl shadow flex items-center gap-6 h-full">
            <img
              src="/project.png"
              alt="Projects"
              className="w-20 h-20 p-3 border border-blue-300 rounded-xl shrink-0"
            />
            <div>
              <h3 className="text-xl font-semibold mb-2">Project Ideas</h3>
              <p className="text-gray-600 text-base leading-relaxed">
                Real-world project ideas to strengthen your resume profile.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* ANALYZE BOX */}
      <div className="max-w-4xl mx-auto bg-white p-12 rounded-2xl shadow mb-12">
        <input
          type="file"
          className="w-full mb-6"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <select
          className="w-full mb-6 p-3 border rounded"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">Select Role</option>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
          <option value="fullstack">Full Stack</option>
          <option value="data">Data Analyst</option>
          <option value="aiml">AI / ML</option>
          <option value="other">Other</option>
        </select>

        {role === "other" && (
          <input
            className="w-full mb-6 p-3 border rounded"
            placeholder="Enter custom role"
            value={customRole}
            onChange={(e) => setCustomRole(e.target.value)}
          />
        )}

        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="w-full bg-blue-900 text-white py-3 rounded text-lg disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>
      </div>

      {result && <ResultCard result={result} />}
    </div>
  );
}
