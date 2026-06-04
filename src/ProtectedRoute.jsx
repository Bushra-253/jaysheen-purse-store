import { useState } from "react";

export default function ProtectedRoute({ children }) {
  const [authorized, setAuthorized] = useState(
    sessionStorage.getItem("adminAuth") === "true"
  );

  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === "123456") { // your password
      sessionStorage.setItem("adminAuth", "true");
      setAuthorized(true);
    } else {
      alert("Wrong Password");
    }
  };

  if (!authorized) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form onSubmit={handleSubmit}>
          <h3>Enter Password</h3>

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  return children;
}