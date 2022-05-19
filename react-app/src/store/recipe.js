const ALL_RECIPES = 'recipes/ALL_POSTS'
const CREATE_RECIPE = 'recipes/CREATE_RECIPE'
const ONE_RECIPE = 'recipes/ONE_RECIPE'
const DELETE_RECIPE = 'recipes/DELETE_RECIPE'
const UPDATE_RECIPE = 'recipes/UPDATE_RECIPE'

const updateRecipeActionCreator = (recipe) => ({
    type: UPDATE_RECIPE,
    recipe
})

const deleteRecipeActionCreator = (recipeId) => ({
    type: DELETE_RECIPE,
    recipeId
})

const oneRecipeActionCreator = (recipe) => ({
    type: ONE_RECIPE,
    recipe
})

const createRecipeActionCreator = (recipe) => ({
    type: CREATE_RECIPE,
    recipe
})

const allRecipesActionCreator = (recipes) => ({
    type: ALL_RECIPES,
    recipes
})

export const oneRecipe = (recipeId) => async (dispatch) => {
    const response = await fetch(`/api/recipes/${recipeId}`)

    if (response.ok) {
        const recipe = await response.json()
        dispatch(oneRecipeActionCreator(recipe))
        return recipe;
    }
}

export const createRecipe = (recipe) => async (dispatch) => {
    const response = await fetch('/api/recipes/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipe)
    })
    if (response.ok) {
        const recipe = await response.json()
        dispatch(createRecipeActionCreator(recipe))
        return recipe;
    }
}

export const updateRecipe = (recipe) => async (dispatch) => {
    const response = await fetch(`/api/recipes/${recipe.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipe)
    })
    if (response.ok) {
        const recipe = await response.json()
        dispatch(updateRecipeActionCreator(recipe))
        return recipe;
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

export const deleteRecipe = (recipeId) => async (dispatch) => {
    const response = await fetch(`/api/recipes/${recipeId}`, {
        method: 'DELETE',
    })
    if (response.ok) {
        const recipe = await response.json()
        console.log(recipe.message)
        dispatch(deleteRecipeActionCreator(recipeId))
        return recipe;
    } else {
        console.log('response was NOT ok champ')
    }
}


let initialState = {}
export default function recipeReducer(state = initialState, action) {
    let newState
    switch (action.type) {
        case ONE_RECIPE: {
            newState = { ...state }
            newState[action.recipe.id] = action.recipe
            return newState;
        }
        case CREATE_RECIPE: {
            newState = { ...state }
            newState[action.recipe.id] = action.recipe
            return newState;
        }
        case UPDATE_RECIPE: {
            newState = { ...state }
            newState[action.recipe.id] = action.recipe
            return newState;
            }
        case ALL_RECIPES: {
            newState = { ...state }
            action.recipes.map(recipe => {
                return newState[recipe.id] = recipe
            })
            return newState;
        }
        case DELETE_RECIPE: {
            newState = { ...state }
            delete newState[action.recipeId]
            return newState;
        }
        default:
            return state;
    }
}
