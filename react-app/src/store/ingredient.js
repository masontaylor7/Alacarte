const ALL_INGREDIENTS = 'ingredients/ALL_INGREDIENTS'
const CREATE_INGREDIENT = 'ingredients/CREATE_INGREDIENT'

const createIngredientActionCreator = (ingredient) => ({
    type: CREATE_INGREDIENT,
    ingredient
})

const allIngredientsActionCreator = (ingredients) => ({
    type: ALL_INGREDIENTS,
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

let initialState = {}
export default function ingredientReducer(state = initialState, action) {
    let newState
    switch (action.type) {
        case CREATE_INGREDIENT: {
            newState = { ...state }
            newState[action.ingredient.id] = action.ingredient
            return newState
        }
        default:
            return state;
    }
}
