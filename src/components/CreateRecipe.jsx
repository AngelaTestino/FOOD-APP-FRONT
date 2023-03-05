import "./CreateRecipe.css";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createRecipe } from "../redux/actions";
import { NavLink } from "react-router-dom";
import logoNav from "../logoFOOD.png";
import { useForm } from "react-hook-form";

const options = [
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

// eslint-disable-next-line
const regExTitle = /[a-zA-ZÀ-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-ZÀ-ÖØ-öø-ÿ]+\.?)*/;
// eslint-disable-next-line
const regExImage = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;

export function CreateRecipe() {
  const [create, setCreate] = useState("");

  const dispatch = useDispatch();
  //-----------------------------------------
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (form) => {
    console.log(form);
    createRecipe(form)(dispatch);
    setCreate("The recipe was created successfully!");
    reset();
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

            <div className="createBanner">
              "A recipe has no soul. You, as the cook, must bring the soul to
              the recipe"
              <br />
              -Thomas Keller-
            </div>
          </div>
        </div>
        <div className="formulario">
          <NavLink to="home/recipes">
            <img className="logoCreateResponsive" src={logoNav} alt="logoNav" />
          </NavLink>
          <span className="titleCreate">Create a new recipe...</span>
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <span className="titleCreateResponsive">Create a new recipe</span>
            <div className="divInput">
              <input
                type="text"
                className="inputForm"
                placeholder="Name"
                {...register("title", {
                  required: {
                    value: true,
                    message: "*The field name is required.",
                  },
                  pattern: {
                    value: /^[A-Za-zÀ-ÖØ-öø-ÿ ]+$/,
                    message: "*Insert a valid name.",
                  },
                  minLength: {
                    value: 3,
                    message: "*Insert at least 2 characters.",
                  },
                  maxLength: {
                    value: 32,
                    message: "*Insert at most 32 characters.",
                  },
                })}
              />

              <span className="msgError">
                {errors.title && errors.title.message}
              </span>
            </div>

            <div className="divInput">
              <input
                className="inputForm"
                type="number"
                placeholder="Health Score  --0-100--"
                {...register("healthScore", {
                  required: {
                    value: true,
                    message: "*The field health score is required.",
                  },
                  min: {
                    value: 0,
                    message: "*The minimum score is 0.",
                  },
                  max: {
                    value: 100,
                    message: "*The maximum score is 100.",
                  },
                })}
              />

              <span className="msgError">
                {errors.healthScore && errors.healthScore.message}
              </span>
            </div>

            {/* <label className="labelForm">URL Image</label> */}
            <div className="divInput">
              <input
                className="inputForm"
                type="text"
                placeholder="URL image"
                {...register("image", {
                  required: {
                    value: true,
                    message: "*The field URL image is required.",
                  },
                  pattern: {
                    value:
                      // eslint-disable-next-line no-useless-escape
                      /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
                    message: "*Insert a valid URL.",
                  },
                })}
              />
              <span className="msgError">
                {errors.image && errors.image.message}
              </span>
            </div>

            {/* <label className="labelForm">Type of diet</label> */}
            <div className="divInput">
              <select
                id="selectDiet"
                className="selectForm"
                {...register("diets", {
                  required: {
                    value: true,
                    message: "*Select an option.",
                  },
                })}
              >
                <option value="" disabled={true} selected={true}>
                  Diets
                </option>
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
              <span className="msgError">
                {" "}
                {errors.diets && errors.diets.message}
              </span>
            </div>
            <div className="divInput">
              <textarea
                className="inputInstruction"
                type="text"
                placeholder="Summary"
                {...register("summary", {
                  required: {
                    value: true,
                    message: "*The field summary is required.",
                  },
                  minLength: {
                    value: 10,
                    message: "*Insert at least 10 characters.",
                  },
                  maxLength: {
                    value: 100,
                    message: "*Insert at most 100 characters.",
                  },
                })}
              />

              <span className="msgError">
                {errors.summary && errors.summary.message}
              </span>
            </div>
            <div className="divInput">
              <textarea
                className="inputInstruction"
                placeholder="Instructions"
                {...register("steps", {
                  required: {
                    value: true,
                    message: "*The field instructions is required.",
                  },
                  minLength: {
                    value: 20,
                    message: "*Insert at least 20 characters.",
                  },
                })}
              />

              <span className="msgError">
                {" "}
                {errors.steps && errors.steps.message}
              </span>
            </div>
            <div className="boxCreate">
              <button className="btnCreate" type="submit">
                <span>Create</span>
              </button>
            </div>
            <div className="created">
              <h2 className="creado"> {create && create}</h2>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
