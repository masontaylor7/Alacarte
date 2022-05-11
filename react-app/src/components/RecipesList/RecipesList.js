import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import './RecipesList.css'

import { allRecipes } from '../../store/recipe';


const RecipesList = () => {
    const dispatch = useDispatch();
    const recipes = Object.values(useSelector(state => state.recipes))

    useEffect(() => {
        dispatch(allRecipes())
    }, [dispatch])

    const imageStyle = {
        width: "300px",
        height: 'auto'
    }

    return (
        <div>
            {recipes.map(recipe => (
                <div className='single_recipe'>
                    <img src={recipe.image_url} style={imageStyle} />
                    <div>
                        <div className='recipe_title'>{recipe.title}</div>
                        <div>{recipe.directions}</div>
                    </div>
                </div>
            ))}

        </div>
    );
};

export default RecipesList;
