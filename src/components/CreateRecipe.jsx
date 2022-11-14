import "./CreateRecipe.css";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createRecipe } from "../redux/actions";
import { NavLink } from "react-router-dom";
import logoNav from "../logoFOOD.png";
import NavBar from "./NavBar";
const options = [
  { value: "", text: "Diets  --ctrl to select more--" },
  { value: "1", text: "gluten free" },
  { value: "2", text: "ketogenic" },
  { value: "3", text: "lacto ovo vegetarian" },
  { value: "4", text: "vegan" },
  { value: "5", text: "pescatarian" },
  { value: "6", text: "paleolithic" },
  { value: "7", text: "primal" },
  { value: "8", text: "fodmap friendly" },
  { value: "9", text: "whole 30" },
  { value: "10", text: "dairy free" },
];
export const opciones = options.slice(1);

const initialState = {
  title: "",
  summary: "",
  healthScore: null,
  steps: "",
  image: "",
  diets: [],
};
// eslint-disable-next-line
const regExTitle = /[a-zA-ZÀ-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-ZÀ-ÖØ-öø-ÿ]+\.?)*/;
// eslint-disable-next-line
const regExImage = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;

export function CreateRecipe() {
  const [form, setForm] = useState(initialState);
  const [create, setCreate] = useState("");
  const [errorTitle, setErrorTitle] = useState("");
  const [errorSummary, setErrorSummary] = useState("");
  const [errorImage, setErrorImage] = useState("");
  const [btn, setBtn] = useState(true);

  const dispatch = useDispatch();

  const handleTitle = (e) => {
    e.preventDefault();
    setCreate("");
    setBtn(false);
    if (e.target.value === "") {
      setErrorTitle("Name is required");
      return setForm({ ...form, title: e.target.value });
    }
    if (!regExTitle.test(e.target.value)) {
      setErrorTitle("Name must contain only letters!!!");
    } else {
      setErrorTitle("");
    }
    setForm({ ...form, title: e.target.value });
  };
  const handleSummary = (e) => {
    e.preventDefault();
    setCreate("");
    setBtn(false);
    if (e.target.value === "") {
      setErrorSummary("Summary is required");
      return setForm({ ...form, summary: e.target.value });
    }
    setForm({ ...form, summary: e.target.value });
    setErrorSummary("");
  };
  const handleImage = (e) => {
    e.preventDefault();
    setCreate("");
    setBtn(false);

    if (e.target.value === "") {
      setErrorImage("");
      return setForm({ ...form, image: e.target.value });
    }
    if (!regExImage.test(e.target.value)) {
      setErrorImage("type a valid URL!!!");
    } else {
      setErrorImage("");
    }

    setForm({ ...form, image: e.target.value });
  };

  const handleChange = (e) => {
    e.preventDefault();
    setCreate("");
    setBtn(false);
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSelect = (e) => {
    e.preventDefault();
    setCreate("");
    setBtn(false);
    setForm({
      ...form,
      [e.target.name]: [...e.target.selectedOptions].map((o) => o.value),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);

    if (
      errorTitle === "" &&
      errorSummary === "" &&
      errorImage === "" &&
      form.title !== "" &&
      form.summary !== ""
    ) {
      createRecipe(form)(dispatch);
      setCreate("The recipe was created successfully!");
      document.getElementById("inputScore").value = null;
      setForm(initialState);
      setBtn(true);
    }

    setBtn(true);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="mainCreateRecipe">
        <div className="image" height="100%">
          <div className="overlay-first">
            <div className="divLogoCreate">
              <NavLink to="/home/recipes">
                <img className="logoCreate" src={logoNav} alt="logoNav" />
              </NavLink>
            </div>

            <div className="createBanner">Create your favorite recipe</div>
          </div>
        </div>
        <div className="formulario">
          <NavLink to="home/recipes">
            <img className="logoCreateResponsive" src={logoNav} alt="logoNav" />
          </NavLink>

          <form className="form" onSubmit={handleSubmit}>
            {/* <label className="labelForm">Name</label> */}
            <span className="titleCreateResponsive">Create your recipes</span>
            <div className="divInput">
              <input
                className={!errorTitle ? "inputForm" : "danger"}
                name="title"
                type="text"
                value={form.title}
                onChange={handleTitle}
                placeholder="Name"
              />
              {!errorTitle ? null : (
                <span className="msgError">{errorTitle}</span>
              )}
            </div>

            {/* <label className="labelForm">Summary</label> */}
            <div className="divInput">
              <input
                className={!errorSummary ? "inputForm" : "danger"}
                name="summary"
                type="text"
                value={form.summary}
                onChange={handleSummary}
                placeholder="Summary"
              />
              {!errorSummary ? null : (
                <span className="msgError">{errorSummary}</span>
              )}
            </div>

            {/* <label className="labelForm">Health Score</label> */}
            <div className="divInput">
              <input
                id="inputScore"
                className="inputForm"
                name="healthScore"
                type="number"
                value={form.healthScore}
                placeholder="HealthScore  --0-100--"
                min={1}
                max={100}
                onChange={handleChange}
              />
            </div>

            {/* <label className="labelForm">URL Image</label> */}
            <div className="divInput">
              <input
                className={!errorImage ? "inputForm" : "danger"}
                name="image"
                type="text"
                value={form.image}
                onChange={handleImage}
                placeholder="URL image"
              />
              {!errorImage ? null : (
                <span className="msgError">{errorImage}</span>
              )}
            </div>

            {/* <label className="labelForm">Type of diet</label> */}
            <div className="divInput">
              <select
                name="diets"
                className="selectForm"
                multiple={true}
                value={form.diets}
                onChange={handleSelect}
              >
                {options.map((option) =>
                  option.value ? (
                    <option key={option.value} value={option.value}>
                      {option.text}
                    </option>
                  ) : (
                    <option
                      key={option.value}
                      value={option.value}
                      disabled={true}
                    >
                      {option.text}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* <label className="labelForm">Instructions</label> */}
            <div className="divInput">
              <textarea
                className="inputInstruction"
                name="steps"
                value={form.steps}
                onChange={handleChange}
                placeholder="Instructions"
              />
            </div>
            <div className="boxCreate">
              <button className="btnCreate" type="submit" disabled={btn}>
                <span>Create</span>
              </button>
            </div>
            <div className="created">
              {create && <h2 className="creado">{create}</h2>}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
