const ALL_CATEGORIES = 'categories/ALL_CATEGORIES'

const allCategoriesActionCreator = (categories) => ({
    type: ALL_CATEGORIES,
    categories
})

export const allCategories = () => async (dispatch) => {
    const response = await fetch('/api/categories/', {
        method: 'GET'
    })

    if (response.ok) {
        const categories = await response.json()
        dispatch(allCategoriesActionCreator(categories))
        return categories;
    }
}


let initialState = {}
export default function categoryReducer(state = initialState, action) {
    let newState
    switch (action.type) {
        case ALL_CATEGORIES: {
            newState = {}
            action.categories.map(category => {
                return newState[category.id] = category
            })
            return newState;
        }
        default:
            return state;
    }
}
