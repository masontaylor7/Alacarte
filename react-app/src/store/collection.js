const ALL_COLLECTIONS = 'collections/ALL_COLLECTIONS'
const COLLECTION_RECIPES = 'collections/COLLECTION_RECIPES'

const allCollectionsActionCreator = (collections) => ({
    type: ALL_COLLECTIONS,
    collections
})

const collectionRecipesActionCreator = (collection) => ({
    type: COLLECTION_RECIPES,
    collection
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

    if (response.ok) {
        const collection = await response.json()
        // console.log(collection, '...............')
        dispatch(collectionRecipesActionCreator(collection))
        return collection
    }
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
        case COLLECTION_RECIPES: {
            newState = {}
            newState[action.collection.id] = action.collection
            return newState;
        }
        default:
            return state;
    }
}
