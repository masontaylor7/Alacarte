const ALL_COLLECTIONS = 'collections/ALL_COLLECTIONS'

const allCollectionsActionCreator = (collections) => ({
    type: ALL_COLLECTIONS,
    collections
})

export const allCollections = (userId) => async (dispatch) => {
    const response = await fetch(`/api/collections/users/${userId}`, {
        method: 'GET'
    })

    if (response.ok) {
        const collections = await response.json()
        dispatch(allCollectionsActionCreator(collections))
        return collections;
    }
}

export const getCollectionRecipes = (collectionId) => async (dispatch) => {
    const response = await fetch(`/api/collections/${collectionId}/recipes`)
    console.log(response)
}


let initialState = {}
export default function collectionReducer(state = initialState, action) {
    let newState
    switch (action.type) {
        case ALL_COLLECTIONS: {
            newState = { ...state }
            action.collections.map(collection => {
                return newState[collection.id] = collection
            })
            return newState;
        }
        default:
            return state;
    }
}
