import { Link } from "react-router-dom";
import "../css/pages/Home.css";

export default function Home() {
  return (
    <div id="home-page">
      <h1>Pets clinic</h1>
      <p>register for a visit</p>
      <br></br>
      <Link to="/login">log in or register</Link>
    </div>
  );
}
