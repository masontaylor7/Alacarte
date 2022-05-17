import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { oneRecipe } from '../../store/recipe';
import { BsDot } from 'react-icons/bs'
import './IndividualRecipe.css'



const IndividualRecipe = () => {
    const dispatch = useDispatch();
    const { recipeId } = useParams();
    const recipe = useSelector(state => state.recipes[+recipeId])
    const sessionUser = useSelector(state => state.session.user)
    const [deleteModal, setDeleteModal] = useState(false)

    const imageStyle = {
        width: "500px",
        height: 'auto'
    }

    useEffect(() => {
        dispatch(oneRecipe(recipeId))
    }, [dispatch])

    const handleDelete = (recipeId) => {
        return
    }

    const handleEdit = (recipeId) => {
        return
    }

    const handleDeleteModalClose = () => {
        setDeleteModal(false)
    }

    const handleDeleteModalOpen = () => {
        setDeleteModal(true)
    }

    return (
        <div className='individual_recipe_page'>

            <div className='sticky_block'>
                <div className='image_block'>
                    {recipe?.image_url ? <img src={recipe.image_url} style={imageStyle} alt='image' /> : <img src='https://img.buzzfeed.com/buzzfeed-static/static/2019-12/4/16/tmp/96ecd548dea3/tmp-name-2-109-1575477795-3_dblbig.jpg?resize=1200:*' style={imageStyle} alt='image' />}

                </div>


                <div className='information_block'>
                    <div className='recipe_info_block'>
                        <div className='recipe_info_top_portion'>
                            <div className='recipe_category'>{recipe?.category.title}</div>

                            {sessionUser.id === recipe?.user_id ?
                                <div className='button_block'>
                                    <button type='button' className='update_recipe_button top_button' onClick={handleEdit}>Update Recipe</button>
                                    <button type='button' className='remove_recipe_button top_button' onClick={handleDeleteModalOpen}>Remove Recipe</button>
                                </div> : null}

                            {deleteModal ? <div className='delete_modal' onClose={handleDeleteModalClose}>
                                <div>Are you sure you want to delete your recipe?</div>
                                <div className='delete_modal_buttons'>

                                    <button type='button' onClick={handleDeleteModalClose}>No, Cancel</button>
                                    <button>Yes, Remove</button>
                                </div>
                            </div> : null}


                        </div>
                        <div className='recipe_title'>{recipe?.title}</div>
                        <div className='recipe_user_info'>Created By: <span className='username'>
                            {recipe?.user.username}</span></div>
                    </div>
                    <div className='prep_time'>Prep Time: {recipe?.prep_time}</div>
                    <div className='cook_time'>Cook Time: {recipe?.cook_time}</div>
                    <div className='total_time'>Total Time: {recipe?.total_time}</div>
                    <div className='serving_size'>Servings: {recipe?.servings}</div>
                    <div className='ingredients_label'>Ingredients: </div>
                    {recipe?.ingredients.map(ingredient => (
                        <div className='individual_ingredient_info'>
                            <BsDot />
                            <div className='ingredient_amount'>{ingredient.amount}&nbsp;</div>
                            <div className='ingredient_measurement'>{ingredient.measurement}&nbsp;</div>
                            <div className='ingredient_title'>{ingredient.title}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className='directions_block'>
                <div className='directions_text'>
                    <div className='directions_label'>Directions: </div>
                    {recipe?.directions}
                </div>
            </div>


        </div>
    );
};

export default IndividualRecipe;
