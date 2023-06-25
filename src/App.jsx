import { Container } from "react-bootstrap";
import "./App.css";
import NavBar from "./components/NavBar";
import Search from "./components/Search";
import UserProfile from "./components/UserProfile";
import { useState } from "react";

function App() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="main_app">
      <NavBar />
      <h1 className="text-center mt-2">Search Users on Github</h1>
      <Search setUserData={setUserData} setLoading={setLoading} />

      <UserProfile userData={userData} loading={loading} />
    </div>
  );
}

export default App;
