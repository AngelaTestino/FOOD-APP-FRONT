import "./Search.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { getAllRecipes } from "../redux/actions";

export default function Search() {
  const [name, setName] = useState("");
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const dispatch = useDispatch();
  const recipesRedux = useSelector((state) => state.recipes);

  function handleChange(e) {
    e.preventDefault();
    setName(e.target.value);
    const recipes = recipesRedux.filter((recipe) => {
      return (
        recipe.title.toUpperCase().includes(e.target.value.toUpperCase()) ===
        true
      );
    });
    getAllRecipes(recipes)(dispatch);
  }
  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  if (windowSize.innerWidth <= 800) {
    return (
      <>
        <input
          type="text"
          className="searchInputResponsive"
          name="search"
          value={name}
          placeholder="Search for a recipe..."
          onChange={(e) => handleChange(e)}
        ></input>
      </>
    );
  } else {
    return (
      <>
        <div className="box">
          {/* <form onSubmit={(e) => handleSubmit(e)}> */}
          <input type="checkbox" id="check" />
          <div className="search-box">
            <input
              type="text"
              className="SearchInput"
              name="search"
              value={name}
              placeholder="Search for a recipe..."
              onChange={(e) => handleChange(e)}
            />
            <label for="check" className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                id="Capa_1"
                x="0px"
                y="0px"
                viewBox="0 0 183.792 183.792"
                xmlSpace="preserve"
              >
                <path d="M54.734,9.053C39.12,18.067,27.95,32.624,23.284,50.039c-4.667,17.415-2.271,35.606,6.743,51.22  c12.023,20.823,34.441,33.759,58.508,33.759c7.599,0,15.139-1.308,22.287-3.818l30.364,52.592l21.65-12.5l-30.359-52.583  c10.255-8.774,17.638-20.411,21.207-33.73c4.666-17.415,2.27-35.605-6.744-51.22C134.918,12.936,112.499,0,88.433,0  C76.645,0,64.992,3.13,54.734,9.053z M125.29,46.259c5.676,9.831,7.184,21.285,4.246,32.25c-2.938,10.965-9.971,20.13-19.802,25.806  c-6.462,3.731-13.793,5.703-21.199,5.703c-15.163,0-29.286-8.146-36.857-21.259c-5.676-9.831-7.184-21.284-4.245-32.25  c2.938-10.965,9.971-20.13,19.802-25.807C73.696,26.972,81.027,25,88.433,25C103.597,25,117.719,33.146,125.29,46.259z" />
              </svg>
            </label>
          </div>
        </div>
      </>
    );
  }
}

function getWindowSize() {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}
