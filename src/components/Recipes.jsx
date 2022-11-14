import { useDispatch, useSelector } from "react-redux";
import Recipe from "./Recipe.jsx";
import { getAllRecipes, filtrarRecipe, recetaCache } from "../redux/actions.js";
import React, { useEffect, useState } from "react";
import "./Recipes.css";
import { opciones } from "./CreateRecipe.jsx";
import NotFound from "./NotFound.jsx";
import Search from "./Search.jsx";

opciones.unshift({ value: "All", text: "All" });

export default function Recipes() {
  const dispatch = useDispatch();
  let recipes = useSelector((state) => state.recipes);
  let cacheRecipes = useSelector((state) => state.recetaCache);
  let error = useSelector((state) => state.error);

  const [btnPrev, setBtnPrev] = useState(true);
  const [btnNext, setBtnNext] = useState(false);
  const [selectedDiet, setSelectedDiet] = useState("");
  const [selectedScore, setSelectedScore] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [radio, setRadio] = useState("");
  const [radioScore, setRadioScore] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [windowSize, setWindowSize] = useState(getWindowSize());

  const hanldeScore = (e) => {
    setSelectedName("");

    let recipesOrder = [];
    if (e.target.value === "lowest") {
      recipesOrder = [...cacheRecipes].sort((a, b) => {
        return a.healthScore - b.healthScore;
      });

      dispatch(recetaCache(recipesOrder));
    }
    if (e.target.value === "highest") {
      recipesOrder = [...cacheRecipes].sort((a, b) => {
        return b.healthScore - a.healthScore;
      });
      dispatch(recetaCache(recipesOrder));
    }

    setCurrentPage(0);
    if (cacheRecipes.length <= 9) {
      setBtnPrev(true);
      setBtnNext(true);
    } else {
      setBtnPrev(true);
      setBtnNext(false);
    }
    setSelectedScore(e.target.value);
  };

  const handleName = (e) => {
    setSelectedScore("");
    let recipesOrder = [];
    if (e.target.value === "a") {
      recipesOrder = [...cacheRecipes].sort((a, b) => {
        return a.title.localeCompare(b.title, "es", { sensitivity: "base" });
      });
      dispatch(recetaCache(recipesOrder));
    }
    if (e.target.value === "z") {
      recipesOrder = [...cacheRecipes]
        .sort((a, b) => {
          return a.title.localeCompare(b.title, "es", { sensitivity: "base" });
        })
        .reverse();
      dispatch(recetaCache(recipesOrder));
    }
    setCurrentPage(0);
    if (cacheRecipes.length <= 9) {
      setBtnPrev(true);
      setBtnNext(true);
    } else {
      setBtnPrev(true);
      setBtnNext(false);
    }
    setSelectedName(e.target.value);
  };

  const handlefilter = (event) => {
    event.preventDefault();
    setCurrentPage(0);
    let index = event.target.selectedIndex;
    let valor = event.target.options[index].text;
    let recipeFiltered = recipes.filter((recipe) =>
      recipe.diets.map((e) => e.toUpperCase()).includes(valor.toUpperCase())
    );

    if (valor === "All") {
      filtrarRecipe(recipes)(dispatch);
      return setSelectedDiet(event.target.value);
    }
    filtrarRecipe(recipeFiltered)(dispatch);
    setSelectedDiet(event.target.value);
  };

  function prevHandler() {
    if (currentPage === 0) {
      setBtnPrev(true);
    }
    setBtnNext(false);
    if (currentPage > 9) {
      setBtnPrev(false);
      setCurrentPage((currentPage) => currentPage - 9);
    }
    if (currentPage === 9) {
      setBtnPrev(true);
      setCurrentPage((currentPage) => currentPage - 9);
    }
  }
  function nextHandler() {
    setBtnPrev(false);

    if (cacheRecipes.length - (currentPage + 9) <= 9) {
      setBtnNext(true);
    }
    setCurrentPage((currentPage) => currentPage + 9);
  }

  useEffect(() => {
    getAllRecipes()(dispatch);
  }, [dispatch]);

  useEffect(() => {
    dispatch(recetaCache(recipes));
  }, [recipes, dispatch]);

  useEffect(() => {
    if (cacheRecipes.length <= 9) {
      setBtnNext(true);
    } else {
      setBtnNext(false);
    }
  }, [cacheRecipes.length]);
  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);
  return (
    <>
      <div className={error ? "errorContainer" : "mainRecipes"}>
        {windowSize.innerWidth <= 800 && <Search />}
        <div className="containerInputs">
          <select
            name="filterDiet"
            className="selectRecipes"
            value={selectedDiet}
            onChange={handlefilter}
          >
            <option value="" selected={true} hidden>
              Filter by diet
            </option>

            {opciones.map((option) => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>

          <select
            className="selectRecipes"
            value={selectedScore}
            onChange={hanldeScore}
          >
            <option value="" selected={true} hidden>
              Order by Score
            </option>
            <option value="lowest">Lowest to highest</option>
            <option value="highest">Highest to Lowest</option>
          </select>

          <select
            className="selectRecipes"
            value={selectedName}
            onChange={handleName}
          >
            <option value="" selected={true} hidden>
              Order by Name
            </option>
            <option value="a">From A to Z</option>
            <option value="z">From Z to A</option>
          </select>
        </div>
        <div className="containerRecipes">
          {error && <NotFound />}

          {cacheRecipes &&
            cacheRecipes
              .slice(currentPage, currentPage + 9)
              .map((recipe) => <Recipe key={recipe.id} {...recipe} />)}
        </div>
        {error ? null : (
          <div className="divPaginado">
            <div className="boxBtn">
              <button
                className="btnPaginado"
                onClick={prevHandler}
                disabled={btnPrev}
              >
                <span>Previous</span>
              </button>
            </div>
            <div className="boxBtn">
              <button
                className="btnPaginado"
                onClick={nextHandler}
                disabled={btnNext}
              >
                <span>Next</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
function getWindowSize() {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}
