import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import '../RecipesList/RecipesList.css'
import { AiOutlineFieldTime } from 'react-icons/ai'
import { BiBookAdd } from 'react-icons/bi'

import { allRecipes } from '../../store/recipe';
import { allCollections, createCollection } from '../../store/collection';
import { createCollectionRecipe } from '../../store/collection_recipe';

const BrowseAllRecipes = () => {
    const dispatch = useDispatch();
    const recipes = Object.values(useSelector(state => state.recipes))

    const collections = Object.values(useSelector(state => state.collections))
    const sessionUser = useSelector(state => state.session.user);
    const [showAddToCollectionModal, setShowAddToCollectionModal] = useState(false)
    const [recipeId, setRecipeId] = useState(0)
    const [showAddModal, setShowAddModal] = useState(false)
    const [newCollectionErrors, setNewCollectionErrors] = useState([])
    const [title, setTitle] = useState('')
    const [showErrors, setShowErrors] = useState(false)

    // const recipes = Object.values(useSelector(state => state.recipes))

    useEffect(() => {
        dispatch(allRecipes())
        dispatch(allCollections(sessionUser?.id))
    }, [dispatch])

    useEffect(() => {
        const errors = []
        if (title.length === 0) errors.push('A name is required')
        setNewCollectionErrors(errors)
    }, [title])

    const imageStyle = {
        width: "300px",
        height: '450px'
    }

    const handleAddToCollectionOpen = (recipeId) => {
        setShowAddToCollectionModal(true)
        setRecipeId(recipeId)
    }

    const handleAddToCollectionClose = () => {
        setShowAddToCollectionModal(false)
        setRecipeId(0)

    }

    const handleSetTitle = (e) => {
        setTitle(e.target.value)
    }

    const handleAddRecipe = async (collectionId) => {
        const entry = {
            recipe_id: recipeId,
            collection_id: collectionId
        }

        await dispatch(createCollectionRecipe(entry))
        setShowAddToCollectionModal(false)
        setRecipeId(0)

    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const collection = {
            user_id: sessionUser.id,
            title
        }

        if (newCollectionErrors.length === 0 && title.length > 0) {
            dispatch(createCollection(collection))
            setTitle('')
            setShowAddModal(false)
        } else {
            setShowErrors(true)

        }

    }

    return (
        <div className='collection_recipe_page'>

            <div className='image_div_background'>
                <img src='https://img.freepik.com/free-photo/fresh-colourful-ingredients-mexican-cuisine_23-2148254294.jpg?w=2000' />
            </div>
            <div className='recipe_list'>

                {recipes?.map(recipe => (
                    <div key={recipe?.id} className='div_hover'>
                        <NavLink className='single_recipe' to={`/recipes/${recipe?.id}`} >
                            <img src={recipe?.image_url} style={imageStyle} />
                            <div className='recipe_details'>
                                <div className='recipe_category'>{recipe?.category?.title}</div>
                                <div className='title_block'>
                                    <div className='list_recipe_title'>{recipe?.title}</div>
                                </div>

                                <div className='total_time'><AiOutlineFieldTime /> {recipe?.total_time}
                                    <div className='recipe_servings'>Servings: {recipe?.servings}</div>
                                    <div className='recipe_username'>Creator: {recipe?.user?.username}</div>
                                </div>
                            </div>

                        </NavLink>
                        <div className='remove_button_block'>
                            <BiBookAdd className='icon add_to_collection' onClick={() => handleAddToCollectionOpen(recipe.id)} />
                        </div>
                    </div>
                ))}
            </div>

            {showAddToCollectionModal ?
                <div className='opaque_container' onClick={() => setShowAddToCollectionModal(false)}>
                    <div className='add_recipe_modal' onClick={(e) => e.stopPropagation()}>
                        <div className='modal_title_add'>Select a collection to save this recipe to: </div>
                        <div className='collection_link_list'>
                            <div className='individual_collection_block_new' onClick={() => setShowAddModal(true)}>
                                <div className='collection_titles'>Create New Collection</div>
                            </div>
                            {collections?.map(collection => (
                                <div key={collection.id} className='individual_collection_block' onClick={() => handleAddRecipe(collection.id)}>
                                    <div className='collection_titles'>{collection.title}</div>
                                </div>
                            ))}
                        </div>
                        <div className='remove_button_block_two'>
                            <button type='button' className='cancel_button' onClick={handleAddToCollectionClose}>Cancel</button>
                        </div>
                    </div>
                </div>
                : null}

            {showAddModal ?
                <div className='opaque_container' onClick={() => setShowAddModal(false)}>
                    <div className='add_collection_modal' onClick={(e) => e.stopPropagation()}>
                        <div>Give your new collection a name!</div>
                        {newCollectionErrors.length > 0 ?
                            newCollectionErrors.map((error, ind) => (
                                <div key={ind} className='error_message'>{error}</div>
                            ))
                            : null}
                        <form className='new_collection_form'>
                            <input type='text'
                                className='input title-input'
                                name='title'
                                onChange={handleSetTitle}
                                value={title}
                            />
                            <button onClick={handleSubmit} className='submit_button'>Create Collection</button>
                        </form>
                    </div>
                </div>
                : null}

        </div>
    );
};

export default BrowseAllRecipes;
