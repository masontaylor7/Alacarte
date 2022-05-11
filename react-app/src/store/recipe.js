const ALL_RECIPES = 'recipes/ALL_POSTS'

const allRecipesActionCreator = (recipes) => ({
    type: ALL_RECIPES,
    recipes
})

export const allRecipes = () => async (dispatch) => {
    const response = await fetch('/api/recipes', {
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
