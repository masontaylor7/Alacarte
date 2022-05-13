const ALL_RECIPES = 'recipes/ALL_POSTS'
const CREATE_RECIPE = 'recipes/CREATE_RECIPE'

const createRecipeActionCreator = (recipe) => ({
    type: CREATE_RECIPE,
    recipe
})

const allRecipesActionCreator = (recipes) => ({
    type: ALL_RECIPES,
    recipes
})

export const createRecipe = (recipe) => async (dispatch) => {
    const response = await fetch('/api/recipes/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipe)
    })
    if (response.ok) {
        const newRecipe = await response.json()
        dispatch(createRecipeActionCreator(newRecipe))
        return newRecipe;
    }
}

export const allRecipes = () => async (dispatch) => {
    const response = await fetch('/api/recipes/', {
        method: 'GET'
    })
    // console.log(response, '<<<<<<<<<<<<<<<<<<')
    if (response.ok) {
        const recipes = await response.json()
        dispatch(allRecipesActionCreator(recipes))
        return recipes;
    }
}


let initialState = {}
export default function recipeReducer(state = initialState, action) {
    let newState
    switch (action.type) {
        case CREATE_RECIPE: {
            newState = { ...state }
            newState[action.recipe.id] = action.recipe
            return newState;
        }
        case ALL_RECIPES: {
            newState = {}
            console.log(action.recipes)
            action.recipes.map(recipe => {
                return newState[recipe.id] = recipe
            })
            return newState;
        }
        default:
            return state;
    }
}
