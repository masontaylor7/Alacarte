const CREATE_ENTRY = 'collection_recipes/CREATE_ENTRY'
const DELETE_ENTRIES = 'collection_recipes/DELETE_ENTRIES'
const DELETE_ENTRY = 'collection_recipes/DELETE_ENTRY'

const deleteEntriesActionCreator = (entries) => ({
    type: DELETE_ENTRIES,
    entries
})

const deleteOneEntryActionCreator = (recipe) => ({
    type: DELETE_ENTRIES,
    recipe
})

const createCollectionEntryActionCreator = (entry) => ({
    type: CREATE_ENTRY,
    entry
})

export const deleteOneEntry = (collectionId, recipeId)  => async(dispatch) => {
    const response = await fetch(`/api/collection_recipes/recipe/${recipeId}`, {
        method: 'DELETE',
        body: JSON.stringify({ collectionId, recipeId })
    })
    if (response.ok) {
        const collection = await response.json()
        dispatch(deleteOneEntryActionCreator(recipeId))
        return collection
    }

}

export const deleteEntries = (collectionId) => async (dispatch) => {
    const response = await fetch(`/api/collection_recipes/${collectionId}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        const entries = await response.json()
        dispatch(deleteEntriesActionCreator(entries))
        return entries
    }
}

export const createCollectionRecipe = (entry) => async (dispatch) => {
    console.log('entry', entry)
    const response = await fetch('/api/collection_recipes/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry)
    })

    if (response.ok) {
        const newEntry = await response.json()
        console.log('>>>>>>>>>>>> ', newEntry, ' <<<<<<<<<<<<<')
        dispatch(createCollectionEntryActionCreator(newEntry))
        return newEntry;
    }
}

let initialState = {}
export default function collectionRecipeReducer(state = initialState, action) {
    let newState
    switch (action.type) {
        case DELETE_ENTRIES: {
            newState = { ...state }
            action.entries.map(entry => {
                delete newState[entry.id]
            })
            return newState;
        }
        case DELETE_ENTRY: {
            newState = { ...state }
            delete newState[action.recipe.id]
            return newState;
        }
        case CREATE_ENTRY: {
            newState = { ...state }
            newState[action.entry.id] = action.entry
            return newState;
        }
        default:
            return state;
    }
}
