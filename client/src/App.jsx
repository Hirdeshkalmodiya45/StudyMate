import { Route, Routes } from "react-router-dom";
import React, { useEffect, Suspense, useContext } from "react";
import "./App.css";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
const ExamLayout = React.lazy(() => import("./pages/ExamLayout"));
import Layout from "./pages/Layout";
import PageNotFound from "./pages/PageNotFound";
import Verification from "./pages/Verification";
import Dashboard from "./pages/Dashboard";
import AppContext from "./contexts/AppContext";
import Progressboard from "./pages/Progressboard";
import ExamContextProvider from "./contexts/ExamContextProvider";
import Practice from "./pages/pratice";
import TestUploadForm from "./pages/TestUploadForm";
let flag = true;

function App() {
  const { email, setEmail, setUser,isVerified } = useContext(AppContext);

  useEffect(() => {
    if (flag) {
      flag = false;
      const verifySession = async () => {
        const response = await fetch("http://localhost:3300/auth", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        return response.json();
      };

      verifySession()
        .then(({ success, decoded }) => {
          console.log(success);
          if (success) {
            setEmail(decoded.email);
            setUser(decoded.user);
          }
          else {
      setEmail(null);  // ← yeh add karo
    }
        })
        .catch((err) => console.error(err));
         setEmail(null); 
    }
    // AppContext mein add karo:

  });

  return (
    <>
      {/* All the react routers are defined here */}

      <Routes>
        {/* The layout router is the home page of our website */}
        <Route path="/" element={<Layout email={email} />}>
          <Route path="/" element={<Welcome />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />

          {email && (
            <Route
              path="exam"
              element={
                <ExamContextProvider>
                  <Suspense
                    fallback={
                      <h3 className="text-xl mt-72 w-full text-center">
                        Exam page is loading...
                      </h3>
                    }
                  >
                    <ExamLayout />
                  </Suspense>
                </ExamContextProvider>
              }
            />
          )}
          <Route path="practice" element={email ? <Practice /> : <Login />} />
          <Route path="upload" element={email ? <TestUploadForm /> : <Login />} />
          <Route path="verify" element={<Verification />} />
        <Route path="dashboard" element={isVerified ? <Dashboard /> : <Login />} />
<Route path="result/progressboard" element={email ? <Progressboard /> : <Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
