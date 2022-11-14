import logoNav from "../logoFOOD.png";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
// import imagen from "../menu.svg";
import Search from "./Search.jsx";
import React, { useEffect, useState } from "react";

export default function NavBar() {
  const [color, setColor] = useState(false);

  const { pathname } = useLocation();
  // * sticky nav color
  const changeColor = () => {
    if (window.scrollY >= 80) {
      setColor(true);
    }
    if (window.scrollY === 0) {
      setColor(false);
    }
  };
  window.addEventListener("scroll", changeColor);

  // * responnsive nav
  var line1__bars;
  var line2__bars;
  var line3__bars;
  var container__menu;

  const animateBars = () => {
    line1__bars.classList.toggle("activeline1__bars-menu");
    line2__bars.classList.toggle("activeline2__bars-menu");
    line3__bars.classList.toggle("activeline3__bars-menu");
    container__menu.classList.toggle("menu__active");
  };

  useEffect(() => {
    line1__bars = document.querySelector(".line1__bars-menu");
    line2__bars = document.querySelector(".line2__bars-menu");
    line3__bars = document.querySelector(".line3__bars-menu");
    container__menu = document.querySelector(".containNav");
  });

  return (
    <>
      <header
        className="containNav"
        style={
          color
            ? {
                background: "beige",
                boxShadow: " 0px 1px 35px 0px rgb(32 53 90 / 30%)",
                transition: ".8s ease-in-out",
              }
            : {
                backgroundColor:
                  "linear-gradient(to right, #FA8D8B, #FEACAD, #FA8D8B)",
                transition: ".8s ease-in-out",
              }
        }
      >
        <div className="divLogo">
          <NavLink to="/home/recipes">
            <img className="logoNav" src={logoNav} alt="logoNav" />
          </NavLink>
        </div>
        <div className="snippets_desk">
          <ul>
            <li className="liNav">
              <div className="btnNewRecipe">
                <NavLink style={{ textDecoration: "none" }} to="/createRecipe">
                  <button className="btnRecipe">
                    {/* <svg
                      className="svgCreate"
                      width="20px"
                      height="20px"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 24 24"
                      version="1.1"
                    >
                      <g
                        id="🔍-Product-Icons"
                        stroke="none"
                        stroke-width="1"
                        fill="none"
                        fill-rule="evenodd"
                      >
                        <g
                          id="ic_fluent_food_24_filled"
                          fill="#212121"
                          fill-rule="nonzero"
                        >
                          <path
                            d="M18,3 C18.5128358,3 18.9355072,3.38604019 18.9932723,3.88337887 L19,4 L19,20 C19,20.5522847 18.5522847,21 18,21 C17.4871642,21 17.0644928,20.6139598 17.0067277,20.1166211 L17,20 L17,15 L16,15 C15.4871642,15 15.0644928,14.6139598 15.0067277,14.1166211 L15,14 L15,8 C15,5.790861 16.5,3 18,3 Z M12,3 C12.5128358,3 12.9355072,3.38604019 12.9932723,3.88337887 L13,4 L13,9 C13,10.8635652 11.7256022,12.429479 10.0007613,12.8737865 L10,20 C10,20.5522847 9.55228475,21 9,21 C8.48716416,21 8.06449284,20.6139598 8.00672773,20.1166211 L8,20 L8.00024347,12.8740452 C6.3387946,12.44653 5.09505441,10.9783996 5.00520459,9.20583575 L5,9 L5,4 C5,3.44771525 5.44771525,3 6,3 C6.51283584,3 6.93550716,3.38604019 6.99327227,3.88337887 L7,4 L7,9 C7,9.74025244 7.40216612,10.3865739 7.99992752,10.7323937 L8,4 C8,3.44771525 8.44771525,3 9,3 C9.51283584,3 9.93550716,3.38604019 9.99327227,3.88337887 L10,4 L10.0010775,10.7318119 C10.5523456,10.4124618 10.9370409,9.83744849 10.9929628,9.16897232 L11,9 L11,4 C11,3.44771525 11.4477153,3 12,3 Z"
                            id="🎨-Color"
                          />
                        </g>
                      </g>
                    </svg> */}
                    <svg
                      className="svgCreate"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      version="1.1"
                      id="Capa_1"
                      x="0px"
                      y="0px"
                      viewBox="0 0 52 52"
                      xmlSpace="preserve"
                    >
                      <path d="M26,0C11.664,0,0,11.663,0,26s11.664,26,26,26s26-11.663,26-26S40.336,0,26,0z M38.5,28H28v11c0,1.104-0.896,2-2,2  s-2-0.896-2-2V28H13.5c-1.104,0-2-0.896-2-2s0.896-2,2-2H24V14c0-1.104,0.896-2,2-2s2,0.896,2,2v10h10.5c1.104,0,2,0.896,2,2  S39.604,28,38.5,28z" />
                    </svg>
                    <span className="spanRecipe">New Recipe</span>
                  </button>
                </NavLink>
              </div>
            </li>
          </ul>

          {pathname === "/home/recipes" && <Search />}
        </div>
        {/* 
        <div className="bars__menu" onClick={animateBars}>
          <span className="line1__bars-menu"></span>
          <span className="line2__bars-menu"></span>
          <span className="line3__bars-menu"></span>
        </div> */}
      </header>
    </>
  );
}
