const CREATE_ENTRY = 'collection_recipes/CREATE_ENTRY'

const createCollectionEntryActionCreator = (entry) => ({
    type: CREATE_ENTRY,
    entry
})


export const createCollectionRecipe = (entry) => async (dispatch) => {
    console.log('thunk entry -----', entry)
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
        case CREATE_ENTRY: {
            newState = { ...state }
            newState[action.entry.id] = action.entry
            return newState;
        }
        default:
            return state;
    }
}
