const ALL_INGREDIENTS = 'ingredients/ALL_INGREDIENTS'
const CREATE_INGREDIENT = 'ingredients/CREATE_INGREDIENT'
const SPECIFIC_INGREDIENTS = 'ingredients/SPECIFIC_INGREDIENTS'
const DELETE_INGREDIENT = 'ingredients/DELETE_INGREDIENT'
const UPDATE_INGREDIENT = 'ingredients/UPDATE_INGREDIENT'

const updateIngredientActionCreator = (ingredient) => ({
    type: UPDATE_INGREDIENT,
    ingredient
})

const deleteIngredientActionCreator = (ingredientId) => ({
    type: DELETE_INGREDIENT,
    ingredientId
})

const createIngredientActionCreator = (ingredient) => ({
    type: CREATE_INGREDIENT,
    ingredient
})

const allIngredientsActionCreator = (ingredients) => ({
    type: ALL_INGREDIENTS,
    ingredients
})

const specificIngredientsActionCreator = (ingredients) => ({
    type: SPECIFIC_INGREDIENTS,
    ingredients
})

export const updateIngredient = (ingredient) => async (dispatch) => {
    const response = await fetch(`/api/ingredients/${ingredient.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ingredient)
    })
    if (response.ok) {
        const ingredient = await response.json()
        dispatch(updateIngredientActionCreator(ingredient))
        return ingredient;
    }
}

export const createIngredient = (ingredient) => async (dispatch) => {
    const response = await fetch('/api/ingredients/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ingredient)
    })
    console.log(response)
    if (response.ok) {
        const newIngredient = await response.json()
        dispatch(createIngredientActionCreator(newIngredient))
        return newIngredient;
    } else {
        const errors = await response.json();
        return errors;
    }
}

export const allIngredients = () => async (dispatch) => {
    const response = await fetch('/api/ingredients/', {
        method: 'GET'
    })

    if (response.ok) {
        const ingredients = await response.json()
        dispatch(allIngredientsActionCreator(ingredients))
        return ingredients;
    }
}

export const specificIngredients = (recipeId) => async (dispatch) => {
    const response = await fetch(`/api/ingredients/recipes/${recipeId}`, {
        method: 'GET'
    })
    if (response.ok) {
        const ingredients = await response.json()
        dispatch(specificIngredientsActionCreator(ingredients))
        return ingredients;
    }
}

export const deleteIngredient = (ingredientId) => async (dispatch) => {
    const response = await fetch(`/api/ingredients/${ingredientId}`, {
        method: 'DELETE',
    })
    if (response.ok) {
        const ingredient = await response.json()
        dispatch(deleteIngredientActionCreator(ingredientId))
        return ingredient
    }
}

let initialState = {}
export default function ingredientReducer(state = initialState, action) {
    let newState
    switch (action.type) {
        case SPECIFIC_INGREDIENTS: {
            newState = { ...state }
            action.ingredients.map(ingredient => {
                return newState[ingredient.id] = ingredient
            })
            return newState;
        }
        case CREATE_INGREDIENT: {
            newState = { ...state }
            newState[action.ingredient.id] = action.ingredient
            return newState;
        }
        case UPDATE_INGREDIENT: {
            newState = { ...state }
            newState[action.ingredient.id] = action.ingredient
            return newState;
        }
        case DELETE_INGREDIENT: {
            newState = { ...state }
            delete newState[action.ingredientId]
            return newState;
        }
        default:
            return state;
    }
}
