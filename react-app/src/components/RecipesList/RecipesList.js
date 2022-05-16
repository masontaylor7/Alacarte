import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import './RecipesList.css'
import { AiOutlineFieldTime } from 'react-icons/ai'

import { allRecipes } from '../../store/recipe';


const RecipesList = ({recipes}) => {
    const dispatch = useDispatch();
    // const recipes = Object.values(useSelector(state => state.recipes))

    // useEffect(() => {
    //     dispatch(allRecipes())
    // }, [dispatch])

    const imageStyle = {
        width: "300px",
        height: 'auto'
    }

    return (
        <div className='recipe_list'>
            {recipes.map(recipe => (
                <div key={recipe.id} className='single_recipe'>
                    <NavLink to={`/recipes/${recipe.id}`} >
                        <img src={recipe.image_url} style={imageStyle} />
                        <div className='recipe_details'>
                            <div className='recipe_category'>{recipe.category.title}</div>
                            <div className='recipe_title'>{recipe.title}</div>
                            <div className='total_time'><AiOutlineFieldTime /> {recipe.total_time}</div>
                            <div className='recipe_servings'>Servings: {recipe.servings}</div>
                            <div className='recipe_username'>{recipe.user.username}</div>
                        </div>
                    </NavLink>
                </div>
            ))}

        </div>
    );
};

export default RecipesList;
