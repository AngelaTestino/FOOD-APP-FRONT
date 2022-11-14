import { NavLink } from "react-router-dom";
import "./Landing.css";
import image from "../logoFOOD.png";
export default function Landing() {
  return (
    <>
      <div className="container">
        <div className="miniContainer">
          <img className="logo" src={image} alt="Logo" />

          <div className="btn1">
            <NavLink to="/home/recipes">
              <button className="button">
                <span>Get Started</span>
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}
