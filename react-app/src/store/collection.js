const ALL_COLLECTIONS = 'collections/ALL_COLLECTIONS'
const COLLECTION_RECIPES = 'collections/COLLECTION_RECIPES'
const CREATE_COLLECTION = 'collections/CREATE_COLLECTION'
const DELETE_COLLECTION = 'collections/DELETE_COLLECTION'
const UPDATE_COLLECTION = 'collections/UPDATE_COLLECTION'

const updateCollectionActionCreator = (collection) => ({
    type: UPDATE_COLLECTION,
    collection
})

const deleteColletionActionCreator = (collectionId) => ({
    type: DELETE_COLLECTION,
    collectionId
})

const createCollectionActionCreator = (collection) => ({
    type: CREATE_COLLECTION,
    collection
})

const allCollectionsActionCreator = (collections) => ({
    type: ALL_COLLECTIONS,
    collections
})

const collectionRecipesActionCreator = (collection) => ({
    type: COLLECTION_RECIPES,
    collection
})

export const updateCollection = (collection) => async (dispatch) => {
    const response = await fetch(`/api/collections/${collection.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(collection)
    })
    if (response.ok) {
        const collection = await response.json()
        dispatch(updateCollectionActionCreator(collection))
        return collection
    }
}

export const createCollection = (collection) => async (dispatch) => {
    const response = await fetch('/api/collections/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(collection)
    })

    if (response.ok) {
        const newCollection = await response.json()
        dispatch(createCollectionActionCreator(newCollection))
        return newCollection;
    } else {
        const errors = await response.json();
        return errors;
    }
}

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

export const deleteCollection = (collectionId) => async (dispatch) => {
    const response = await fetch(`/api/collections/${collectionId}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        const collection = await response.json()
        dispatch(deleteColletionActionCreator(collectionId))
        return collection;
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
        case CREATE_COLLECTION: {
            newState = { ...state }
            newState[action.collection.id] = action.collection
            return newState;
        }
        case UPDATE_COLLECTION: {
            newState = { ...state }
            newState[action.collection.id] = action.collection
            return newState;
        }
        case DELETE_COLLECTION: {
            newState = { ...state }
            delete newState[action.collectionId]
            return newState;
        }
        default:
            return state;
    }
}
