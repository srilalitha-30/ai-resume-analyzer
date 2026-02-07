import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // simple but correct email validation
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = () => {
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    // clear error and allow navigation
    setError("");
    navigate("/analyze");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* LEFT SIDE */}
      <div className="w-1/2 flex flex-col justify-center px-16">
        <h1 className="text-4xl font-bold mb-8 text-blue-900">
          AI Resume Analyzer
        </h1>

        <input
          className="border p-3 mb-4 rounded outline-none focus:ring-2 focus:ring-blue-900"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border p-3 mb-4 rounded outline-none focus:ring-2 focus:ring-blue-900"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* ERROR MESSAGE */}
        {error && (
          <p className="text-red-500 text-sm mb-3">
            {error}
          </p>
        )}

        {/* LOGIN BUTTON */}
        <button
          className="bg-blue-900 text-white py-3 rounded hover:bg-blue-800 transition mb-4"
          onClick={handleLogin}
        >
          Login
        </button>

        {/* OR */}
        <p className="text-center text-gray-400 mb-3">or</p>

        {/* GOOGLE SIGN-IN */}
        <button
          className="border py-3 rounded flex items-center justify-center gap-3 hover:bg-gray-100 transition"
          onClick={() => alert("Google Sign-In will be added later")}
        >
          <img
            src="/google-logo.png"
            alt="Google Logo"
            className="w-5 h-5"
          />
          <span>Sign in with Google</span>
        </button>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-1/2 bg-blue-100 flex items-center justify-center">
        <img
          src="/resume-templet.png"
          alt="Resume Template"
          className="w-[120%] h-[120%] object-contain rounded-xl shadow-xl"
        />
      </div>
    </div>
  );
}
