import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory, useParams } from 'react-router-dom'
import '../RecipesList/RecipesList.css'
import { AiOutlineFieldTime } from 'react-icons/ai'

import { allRecipes } from '../../store/recipe';
import { getCollectionRecipes } from '../../store/collection';
import { deleteOneEntry } from '../../store/collection_recipe';


const CollectionRecipesList = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { collectionId } = useParams()
    const collection = Object.values(useSelector(state => state.collections))
    const select = collection[0]
    const [recipeId, setRecipeId] = useState(0)
    const [showRemoveModal, setShowRemoveModal] = useState(false)

    const handleRemoveRecipeModalClose = () => {
        setRecipeId(0)
        setShowRemoveModal(false)
    }

    const handleRemoveRecipeModalOpen = (recipeId) => {
        setRecipeId(recipeId)
        setShowRemoveModal(true)
    }

    const handleRemoveRecipe = async () => {
        const newCollection = await dispatch(deleteOneEntry(collectionId, recipeId))
        if (newCollection) {
            await dispatch(getCollectionRecipes(newCollection?.id))
        }
        setRecipeId(0)
        setShowRemoveModal(false)

    }

    const handleBrowseReroute = () => {
        history.push('/browse/all')
    }

    useEffect(() => {
        dispatch(getCollectionRecipes(collectionId))
    }, [dispatch])

    const imageStyle = {
        width: "300px",
        height: '450px'
    }

    return (
        <div className='collection_recipe_page'>
            <div className='image_div_background'>
                <img src='https://img.freepik.com/free-photo/fresh-colourful-ingredients-mexican-cuisine_23-2148254294.jpg?w=2000' />
            </div>
            <div className='collection_title_block'>Viewing the
                <div className='collection_title'>&nbsp;{select?.title.toUpperCase()}&nbsp;</div>
                collection
            </div>
            {select?.recipes?.length ?
                <div className='recipe_list'>
                    {select?.recipes?.map(recipe => (
                        <div key={recipe?.id} className='div_hover'>
                            <NavLink className='single_recipe' to={`/recipes/${recipe?.id}`} >
                                <img src={recipe?.image_url} className='recipe_img' style={imageStyle} />
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
                                <button type='button' className='remove_button' onClick={() => handleRemoveRecipeModalOpen(recipe?.id)}>Remove From Collection</button>
                            </div>
                        </div>
                    ))}
                </div>
                : <div>
                    <div className='no_recipes_saved_block' onClick={(e) => e.stopPropagation()}>
                        <div>There are no recipes stored in this collection yet. Browse recipes to start saving your favorites here!</div>
                        <div className='browse_recipes_button_block'>
                            <button type='button' className='browse_button' onClick={handleBrowseReroute}>Browse All Recipes</button>
                        </div>
                    </div>
                </div>}

            {showRemoveModal ?
                <div className='opaque_container' onClick={() => setShowRemoveModal(false)}>
                    <div className='remove_recipe_modal' onClick={(e) => e.stopPropagation()}>
                        <div>Remove recipe from this collection?</div>
                        <div className='remove_button_block_two'>
                            <button type='button' className='cancel_button' onClick={handleRemoveRecipeModalClose}>Cancel</button>
                            <button type='button' className='delete_button' onClick={handleRemoveRecipe}>Remove</button>
                        </div>
                    </div>
                </div>
                : null}
        </div>
    );
};

export default CollectionRecipesList;
