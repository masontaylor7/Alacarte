const ALL_INGREDIENTS = 'ingredients/ALL_INGREDIENTS'
const CREATE_INGREDIENT = 'ingredients/CREATE_INGREDIENT'
const SPECIFIC_INGREDIENTS = 'ingredients/SPECIFIC_INGREDIENTS'

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

export const createIngredient = (ingredient) => async (dispatch) => {
    console.log( ingredient,  '>>>>?>?>')
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
        default:
            return state;
    }
}
