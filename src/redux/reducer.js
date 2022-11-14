
import {GET_ALL_RECIPES,CREATE_RECIPE,RECETA_CACHE,ERROR,RECIPE_ID,GET_DIETS} from "./actions";


const initialState={
    recipes:[],
    recetaCache:[],
    recipe:{},
    diets:[],
    create:{},
    error:false

    
}


const reducer=(state=initialState,action)=>{

    switch(action.type){
        case GET_ALL_RECIPES:
            return{
                ...state,
                recipes:action.payload
            }
        case CREATE_RECIPE:
            return{
                ...state,create:action.payload
            }
        case RECETA_CACHE:
            return{ ...state,
                recetaCache:action.payload}

        case RECIPE_ID:
            return{ ...state,
                recipe:action.payload}
        case ERROR:
            return {
                ...state,
                error:action.payload
            }
        case GET_DIETS:
            return{ ...state,
                diets:action.payload}
        default:
            return state
    }
}
export default reducer;