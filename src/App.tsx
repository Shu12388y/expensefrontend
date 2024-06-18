import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Dashboard } from "./pages/dashboard";
import { Auth } from "./pages/auth";
import { FinancialRecordsProvider } from "./contexts/financial-record-context";
import { SignedIn, UserButton, useAuth } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
// import { dark } from "@clerk/themes";

function App() {
  const [user, setUser] = useState("");
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (isSignedIn) {
      setUser("");
    } else {
      setUser("Sign In");
    }
  }, [isSignedIn]);

  return (
    <Router>
      <div className="app-container">
        <div className="navbar">
          <Link to="/auth">{user}</Link>
          <Link to="/"> Dashboard</Link>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <FinancialRecordsProvider>
                <Dashboard />
              </FinancialRecordsProvider>
            }
          />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
