import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { oneRecipe } from '../../store/recipe';
import './IndividualRecipe.css'



const IndividualRecipe = () => {
    const dispatch = useDispatch();
    const { recipeId } = useParams();
    const recipe = useSelector(state => state.recipes[+recipeId])
    // const [imageUrl, setImageUrl] = (recipe.image_url)

    const imageStyle = {
        width: "300px",
        height: 'auto'
    }

    useEffect(() => {
        dispatch(oneRecipe(recipeId))
    }, [dispatch])

    return (
        <div>
            <div>
                {recipe?.image_url ? <img src={recipe.image_url} style={imageStyle} alt='image' /> : <img src='https://img.buzzfeed.com/buzzfeed-static/static/2019-12/4/16/tmp/96ecd548dea3/tmp-name-2-109-1575477795-3_dblbig.jpg?resize=1200:*' style={imageStyle} alt='image' />}
            </div>
        </div>
    );
};

export default IndividualRecipe;
