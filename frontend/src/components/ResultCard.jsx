export default function ResultCard({ result }) {
  if (!result) return null;

  // Error handling
  if (result.error) {
    return (
      <div className="max-w-6xl mx-auto mt-10 bg-red-50 border border-red-200 p-6 rounded-xl shadow">
        <p className="text-red-700 font-semibold text-lg">AI Error</p>
        <p className="mt-2 text-red-600">{result.details || "Unknown AI error"}</p>
      </div>
    );
  }

  const data = result?.result;

  if (
    !data ||
    typeof data.score !== "number" ||
    !Array.isArray(data.strengths) ||
    !Array.isArray(data.weaknesses) ||
    !Array.isArray(data.improvements)
  ) {
    return (
      <div className="max-w-6xl mx-auto mt-10 bg-yellow-50 border border-yellow-200 p-6 rounded-xl shadow">
        <p className="font-semibold text-yellow-800">Invalid AI response structure</p>
        <pre className="text-xs mt-2 overflow-auto">
          {JSON.stringify(result, null, 2)}
        </pre>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto mt-12 space-y-12">

      {/* ATS SCORE */}
      <div className="bg-white p-8 rounded-xl shadow border border-blue-100">
        <h2 className="text-2xl font-semibold text-blue-900 mb-4">ATS Score</h2>

        <div className="w-full bg-blue-100 rounded-full h-3">
          <div
            className="bg-blue-900 h-3 rounded-full"
            style={{ width: `${data.score}%` }}
          ></div>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <p className="text-lg font-semibold text-blue-900">{data.score}/100</p>
          <span className="px-4 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-900 border border-blue-200">
            {data.score >= 80
              ? "High Employability"
              : data.score >= 60
              ? "Moderate Employability"
              : "Low Employability"}
          </span>
        </div>
      </div>

      {/* CORE ANALYSIS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-xl shadow border border-blue-100">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Strengths</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            {data.strengths.map((s, i) => (
              <li key={i}>• {s}</li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border border-blue-100">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Weaknesses</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            {data.weaknesses.map((w, i) => (
              <li key={i}>• {w}</li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border border-blue-100">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Improvements</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            {data.improvements.map((imp, i) => (
              <li key={i}>• {imp}</li>
            ))}
          </ul>
        </div>

      </div>

      {/* PROJECTS */}
      <div className="bg-white p-8 rounded-xl shadow border border-blue-100">
        <h3 className="text-xl font-semibold text-blue-900 mb-6">Professional Project Roadmap</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-700">
          <div className="border border-blue-100 rounded-lg p-4">
            <p className="font-semibold text-blue-900">AI Resume Platform</p>
            <p className="mt-1">ATS engine, AI scoring, recruiter dashboard</p>
          </div>

          <div className="border border-blue-100 rounded-lg p-4">
            <p className="font-semibold text-blue-900">Enterprise Job Portal</p>
            <p className="mt-1">Auth, RBAC, recruiter/admin panels</p>
          </div>

          <div className="border border-blue-100 rounded-lg p-4">
            <p className="font-semibold text-blue-900">Skill Intelligence System</p>
            <p className="mt-1">AI skill mapping + learning recommendations</p>
          </div>
        </div>
      </div>

      {/* OFFICIAL ROADMAP */}
      <div className="bg-white p-8 rounded-xl shadow border border-blue-100">
        <h3 className="text-xl font-semibold text-blue-900 mb-6">Official Learning & Career Roadmap</h3>

        {/* RESOURCES */}
        <div className="mb-8">
          <h4 className="font-semibold text-blue-900 mb-3">Authorized Learning Resources</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">

            <div className="border border-blue-100 rounded-lg p-4">
              <p className="font-medium text-blue-900">Learning Platforms</p>
              <ul className="mt-2 space-y-1">
                <li>• freeCodeCamp.org</li>
                <li>• Coursera.org</li>
                <li>• Udemy Business</li>
                <li>• NPTEL (India)</li>
              </ul>
            </div>

            <div className="border border-blue-100 rounded-lg p-4">
              <p className="font-medium text-blue-900">Practice Platforms</p>
              <ul className="mt-2 space-y-1">
                <li>• LeetCode</li>
                <li>• HackerRank</li>
                <li>• Kaggle</li>
                <li>• Codeforces</li>
              </ul>
            </div>

            <div className="border border-blue-100 rounded-lg p-4">
              <p className="font-medium text-blue-900">Documentation</p>
              <ul className="mt-2 space-y-1">
                <li>• roadmap.sh</li>
                <li>• MDN Docs</li>
                <li>• Official Framework Docs</li>
                <li>• GeeksForGeeks</li>
              </ul>
            </div>

            <div className="border border-blue-100 rounded-lg p-4">
              <p className="font-medium text-blue-900">Professional Channels</p>
              <ul className="mt-2 space-y-1">
                <li>• freeCodeCamp</li>
                <li>• CodeWithHarry</li>
                <li>• TechWorld with Nana</li>
                <li>• Fireship</li>
              </ul>
            </div>

          </div>
        </div>

        {/* SCHEDULE */}
        <div className="mb-8">
          <h4 className="font-semibold text-blue-900 mb-4">Official Weekly Schedule</h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">

            <div className="border border-blue-100 rounded-lg p-4">
              <p className="font-semibold text-blue-900">Weekdays (Mon–Fri)</p>
              <ul className="mt-2 space-y-1 text-gray-700">
                <li>• 1 hr → Core CS Subjects</li>
                <li>• 1 hr → Coding Practice</li>
                <li>• 30 min → Concept Revision</li>
              </ul>
            </div>

            <div className="border border-blue-100 rounded-lg p-4">
              <p className="font-semibold text-blue-900">Saturday</p>
              <ul className="mt-2 space-y-1 text-gray-700">
                <li>• Projects Development</li>
                <li>• System Design Basics</li>
                <li>• Resume & Portfolio</li>
              </ul>
            </div>

            <div className="border border-blue-100 rounded-lg p-4">
              <p className="font-semibold text-blue-900">Sunday</p>
              <ul className="mt-2 space-y-1 text-gray-700">
                <li>• Weekly Revision</li>
                <li>• Mock Interviews</li>
                <li>• Career Planning</li>
              </ul>
            </div>

          </div>
        </div>

        {/* TIMELINE */}
        <div>
          <h4 className="font-semibold text-blue-900 mb-4">Career Execution Timeline</h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">

            <div className="border border-blue-100 rounded-lg p-4">
              <p className="font-semibold text-blue-900">Phase 1 (0–30 Days)</p>
              <p className="mt-1 text-gray-700">
                Core CS foundation, basics, DSA fundamentals, resume cleanup
              </p>
            </div>

            <div className="border border-blue-100 rounded-lg p-4">
              <p className="font-semibold text-blue-900">Phase 2 (30–60 Days)</p>
              <p className="mt-1 text-gray-700">
                Projects, backend/frontend mastery, internship applications
              </p>
            </div>

            <div className="border border-blue-100 rounded-lg p-4">
              <p className="font-semibold text-blue-900">Phase 3 (60–90 Days)</p>
              <p className="mt-1 text-gray-700">
                Interview prep, portfolio, referrals, placements
              </p>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
