import axios from "axios";

export const GET_ALL_RECIPES = "GET_ALL_RECIPES";
export const CREATE_RECIPE = "CREATE_RECIPE";
export const RECETA_CACHE = "RECETA_CACHE";

export const RECIPE_ID = "RECIPE_ID";
export const ERROR = "ERROR";
export const GET_DIETS = "GET_DIETS";
export const SEARCH = "SEARCH";

export const getAllRecipes = (recipes) => (dispatch) => {
  if (recipes) {
    if (!recipes.length) {
      dispatch({ type: RECETA_CACHE, payload: [] });
      dispatch({ type: ERROR, payload: true });
      return;
    } else {
      dispatch({ type: RECETA_CACHE, payload: recipes });
      dispatch({ type: ERROR, payload: false });
      return;
    }
  }

  return axios("/recipes").then(({ data }) => {
    dispatch({ type: GET_ALL_RECIPES, payload: data });
    dispatch({ type: ERROR, payload: false });
  });
};

export const createRecipe = (form) => (dispatch) => {
  return axios
    .post("/recipes", form)
    .then(({ data }) => dispatch({ type: CREATE_RECIPE, payload: data }));
};

export const filtrarRecipe = (data) => (dispatch) => {
  if (data.length === 0) {
    dispatch({ type: RECETA_CACHE, payload: data });
    dispatch({ type: ERROR, payload: true });
  } else {
    dispatch({ type: RECETA_CACHE, payload: data });
    dispatch({ type: ERROR, payload: false });
  }
};

export const recetaCache = (data) => {
  return { type: RECETA_CACHE, payload: data };
};

export const recipeID = (data) => (dispatch) => {
  return axios(`/recipes/${data}`).then(({ data }) =>
    dispatch({ type: RECIPE_ID, payload: data })
  );
};

export const diets = () => (dispatch) => {
  return axios("/diets").then(({ data }) =>
    dispatch({ type: GET_DIETS, payload: data })
  );
};

export const search = (data) => (dispatch) => {
  return dispatch({ type: SEARCH, payload: data });
};
