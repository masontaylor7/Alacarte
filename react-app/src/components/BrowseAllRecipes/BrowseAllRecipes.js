import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import '../RecipesList/RecipesList.css'
import { AiOutlineFieldTime } from 'react-icons/ai'
import { BiBookAdd } from 'react-icons/bi'

import { allRecipes } from '../../store/recipe';
import { allCollections } from '../../store/collection';
import { createCollectionRecipe } from '../../store/collection_recipe';

const BrowseAllRecipes = () => {
    const dispatch = useDispatch();
    const recipes = Object.values(useSelector(state => state.recipes))

    const collections = Object.values(useSelector(state => state.collections))
    const sessionUser = useSelector(state => state.session.user);
    const [showAddToCollectionModal, setShowAddToCollectionModal] = useState(false)
    const [recipeId, setRecipeId] = useState(0)

    // const recipes = Object.values(useSelector(state => state.recipes))

    useEffect(() => {
        dispatch(allRecipes())
        dispatch(allCollections(sessionUser.id))
    }, [dispatch])

    const imageStyle = {
        width: "300px",
        height: 'auto'
    }

    const handleAddToCollectionOpen = (recipeId) => {
        setShowAddToCollectionModal(true)
        setRecipeId(recipeId)
    }

    const handleAddToCollectionClose = () => {
        setShowAddToCollectionModal(false)
        setRecipeId(0)

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

    return (
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
            {showAddToCollectionModal ?
                <div className='opaque_container' onClick={() => setShowAddToCollectionModal(false)}>
                    <div className='add_recipe_modal' onClick={(e) => e.stopPropagation()}>
                        <div className='modal_title_add'>Select a collection to save this recipe to: </div>
                        <div className='collection_link_list'>

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

        </div>
    );
};

export default BrowseAllRecipes;
