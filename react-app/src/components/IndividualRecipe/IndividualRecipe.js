import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { oneRecipe, deleteRecipe, updateRecipe } from '../../store/recipe';
import { allCategories } from '../../store/category';
import { BsDot, BsPlusSquare, BsDashSquare } from 'react-icons/bs'
import './IndividualRecipe.css'
import { deleteIngredient, specificIngredients, createIngredient, updateIngredient } from '../../store/ingredient';


const IndividualRecipe = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { recipeId } = useParams();
    const recipe = useSelector(state => state.recipes[+recipeId])
    console.log('=====', recipe)

    const categories = Object.values(useSelector(state => state.categories))
    const ingredients = Object.values(useSelector(state => state.ingredients))
    const sessionUser = useSelector(state => state.session.user)

    const [deleteModal, setDeleteModal] = useState(false)
    const [editActive, setEditActive] = useState(false)
    const [deleteIngredientModal, setDeleteIngredientModal] = useState(false)
    const [showErrors, setShowErrors] = useState(false)
    const [validationErrors, setValidationErrors] = useState([]);
    console.log(validationErrors)

    {/* current fields*/ }
    const [deleteIndex, setDeleteIndex] = useState(-1)
    const [removedIng, setRemovedIng] = useState([])


    useEffect(() => {
        dispatch(oneRecipe(+recipeId))
    }, [dispatch, editActive])

    const [currTitle, setCurrTitle] = useState(recipe?.title != undefined ? recipe?.title : '')
    const [inputFields, setInputFields] = useState(recipe?.ingredients != undefined ? recipe?.ingredients : [])
    const [categoryId, setCategoryId] = useState(recipe?.category_id || '')
    const [imageUrl, setImageUrl] = useState(recipe?.image_url || '')
    const [title, setTitle] = useState(recipe?.title || '')
    const [prepTime, setPrepTime] = useState(recipe?.prep_time || '')
    const [cookTime, setCookTime] = useState(recipe?.cook_time || '')
    const [totalTime, setTotalTime] = useState(recipe?.total_time || '')
    const [servingSize, setServingSize] = useState(recipe?.servings || '')
    const [directionsInp, setDirectionsInp] = useState('')
    const [placeholder, setPlaceholder] = useState("default");

    // console.log(currTitle, inputFields, categoryId, imageUrl, title, prepTime, prepTime, cookTime, totalTime, servingSize, directionsInp, placeholder, inputFields)

    useEffect(() => {
        const errors = []
        if (currTitle?.length === 0) errors.push('"Name" field cannot be empty')
        if (directionsInp?.length === 0) errors.push('"Directions" field cannot be empty')
        if (prepTime?.length === 0) errors.push('"Prep Time" field cannot be empty')
        if (cookTime?.length === 0) errors.push('"Cook Time" field cannot be empty')
        if (totalTime?.length === 0) errors.push('"Total Time" field cannot be empty')
        if (servingSize?.length === 0) errors.push('"Servings" field cannot be empty')
        inputFields?.map(ingredientObj => {
            if (ingredientObj.title.length === 0) errors.push('An ingredient field has an empty input for "Ingredient Name" <br> (there may be an unused ingredient input)')
        })
        setValidationErrors(errors)
    }, [currTitle, prepTime, cookTime, totalTime, servingSize, directionsInp])


    useEffect(() => {
        setCategoryId(recipe?.category_id)
        setInputFields(recipe?.ingredients)
        setImageUrl(recipe?.image_url)
        setCurrTitle(recipe?.title)
        setPrepTime(recipe?.prep_time)
        setCookTime(recipe?.cook_time)
        setTotalTime(recipe?.total_time)
        setServingSize(recipe?.servings)
        setDirectionsInp(recipe?.directions)
    }, [editActive])


    const handleEdit = () => {
        setEditActive(true)

    }

    const handleCancelEdit = () => {
        handleReAddIngredients()
        setEditActive(false)
        setImageUrl(recipe?.image_url)
        setCurrTitle(recipe?.title)
        setPrepTime(recipe?.prep_time)
        setCookTime(recipe?.cook_time)
        setTotalTime(recipe?.total_time)
        setServingSize(recipe?.servings)
        setDirectionsInp(recipe?.directions)
    }

    const handleDeleteIngredientModalClose = () => {
        setDeleteIngredientModal(false)
    }

    const handleDeleteIngredientModalOpen = () => {
        setDeleteIngredientModal(true)
    }

    const handleDeleteModalClose = () => {
        setDeleteModal(false)
    }

    const handleDeleteModalOpen = () => {
        setDeleteModal(true)
    }

    const handleImageField = (e) => {
        setImageUrl(e.target.value)
    }

    const handleSetTitle = (e) => {
        setTitle(e.target.value)
    }

    const handleSetPrepTime = (e) => {
        setPrepTime(e.target.value)
    }

    const handleSetCookTime = (e) => {
        setCookTime(e.target.value)
    }

    const handleSetTotalTime = (e) => {
        setTotalTime(e.target.value)
    }

    const handleSetServingSize = (e) => {
        setServingSize(e.target.value)
    }

    const handleSetDirectionsInp = (e) => {
        setDirectionsInp(e.target.value)
    }

    const imageStyle = {
        width: "500px",
        height: 'auto'
    }

    useEffect(() => {
        dispatch(specificIngredients(recipeId))
    }, [dispatch])

    useEffect(() => {
        dispatch(allCategories())
    }, [dispatch])

    const handleDelete = async (e) => {
        e.preventDefault()
        await dispatch(deleteRecipe(recipe?.id))
        handleDeleteModalClose()
        await history.push('/browse/all')
    }

    const handleAddField = () => {
        setInputFields([...inputFields, {
            title: '', amount: '', measurement: '', recipe_id: recipe?.id
        }])
    }

    const handleReAddIngredients = () => {
        if (removedIng.length > 0) {

            removedIng.map(ingredientobj => {
                dispatch(createIngredient(ingredientobj))
            })
            setRemovedIng([])
        } else {
            return
        }

    }

    const handleDeleteIngredient = () => {
        const values = [...inputFields]
        const removedInp = values.splice(deleteIndex, 1)
        const removed = [...removedIng]
        removed.push(...removedInp)
        setRemovedIng(removed)

        dispatch(deleteIngredient(removedInp[0].id))
        handleDeleteIngredientModalClose()
        setInputFields(values)
    }

    const handleRemoveField = (index) => {
        const values = [...inputFields]
        const verifyInp = values.slice(index, index + 1)
        if (verifyInp[0].id) {
            setDeleteIndex(index)
            handleDeleteIngredientModalOpen()
        } else {
            values.splice(index, 1)
            setInputFields(values)
        }
    }

    const handleChangeInput = (index, e) => {
        const ingredients = [...inputFields]
        ingredients[index][e.target.name] = e.target.value
        setInputFields(ingredients)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const recipe = {
            id: recipeId,
            image_url: imageUrl,
            title: currTitle,
            category_id: categoryId,
            prep_time: prepTime,
            cook_time: cookTime,
            total_time: totalTime,
            servings: servingSize,
            directions: directionsInp,
        }

        if (validationErrors.length === 0) {
            dispatch(updateRecipe(recipe))

            inputFields?.map(ingredientobj => {
                    if (ingredientobj.id) {
                        dispatch(updateIngredient(ingredientobj))
                    } else {
                        dispatch(createIngredient(ingredientobj))
                    }

            })
            setRemovedIng([])
            setEditActive(false)

        } else {
            setShowErrors(true)
        }


    }


    return (
        <form className='update_recipe_form'>
            <div className='individual_recipe_page'>
                {/* <form> */}
                <div className='sticky_block'>
                    <div className='image_block'>
                        {!editActive && recipe?.image_url ? <img src={recipe?.image_url} style={imageStyle} alt='image' /> : null}

                        {editActive &&
                            <div>

                                <div>
                                    {imageUrl ? <img src={imageUrl} style={imageStyle} alt='image' /> : <img src={recipe?.image_url} style={imageStyle} alt='image' />}
                                </div>

                                <label>Finished Dish Image:</label>
                                <input type='text'
                                    className='input image-input'
                                    name='image_url'
                                    placeholder='Image URL'
                                    onChange={handleImageField}
                                    value={imageUrl}

                                />

                            </div>
                        }
                    </div>


                    <div className='information_block'>
                        <div className='recipe_info_block'>
                            <div className='recipe_info_top_portion'>
                                {!editActive ? <div className='recipe_category'>{recipe?.category.title}</div> : <div className='category-block'>
                                    <select className='input' defaultValue={placeholder} onChange={(e) => setCategoryId(e.target.value)}>
                                        <option value="default" disabled hidden>
                                            {recipe?.category.title}
                                        </option>
                                        {categories?.map(category => (
                                            <option key={category.id} value={category.id}>{category.title}</option>
                                        ))}
                                    </select>
                                </div>}


                                {sessionUser.id === recipe?.user_id && !editActive ?
                                    <div className='button_block'>
                                        <button type='button' className='update_recipe_button top_button' onClick={handleEdit}>Update Recipe</button>
                                        <button type='button' className='remove_recipe_button top_button' onClick={handleDeleteModalOpen}>Remove Recipe</button>
                                    </div> : null}

                                {sessionUser.id === recipe?.user_id && editActive ?
                                    <div className='button_block'>
                                        <button type='button' className='remove_recipe_button top_button' onClick={handleCancelEdit}>Cancel Update</button>
                                        <button type='submit' className='update_recipe_button top_button' onClick={handleSubmit}>Submit Update</button>
                                    </div> : null}


                            </div>
                            {editActive ?
                                <div className='title_block'>
                                    <div className='recipe_title'>{recipe?.title}</div>
                                    <div>
                                        <label>Name of your dish:</label>
                                        <input type='text'
                                            className='input title-input'
                                            name='title'
                                            // placeholder={recipe?.title}
                                            onChange={(e) => setCurrTitle(e.target.value)}
                                            value={currTitle}
                                        />
                                    </div>
                                </div> : <div className='recipe_title'>{recipe?.title}</div>
                            }

                            <div className='recipe_user_info'>Created By: <span className='username'>
                                {recipe?.user.username}</span></div>
                        </div>

                        <div className='full_time_block'>

                            <div className='time_block'>
                                <div className='time_label'>PREP TIME</div>
                                {editActive ?
                                    <input type='text'
                                        className='input prep-time-input'
                                        name='prep_time'
                                        // placeholder='30 mins | 2 hrs'
                                        onChange={handleSetPrepTime}
                                        value={prepTime}

                                    />
                                    : <div className='time_count'>
                                        {recipe?.prep_time}
                                    </div>}
                            </div>

                            <div className='time_block'>
                                <div className='time_label'>COOK TIME</div>
                                {editActive ?
                                    <input type='text'
                                        className='input cook-time-input'
                                        name='cook_time'
                                        // placeholder='30 mins | 2 hrs'
                                        onChange={handleSetCookTime}
                                        value={cookTime}

                                    />
                                    : <div className='time_count'>
                                        {recipe?.cook_time}
                                    </div>}
                            </div>

                            <div className='time_block'>
                                <div className='time_label'>TOTAL TIME</div>
                                {editActive ?
                                    <input type='text'
                                        className='input total-time-input'
                                        name='total_time'
                                        // placeholder='30 mins | 2 hrs'
                                        onChange={handleSetTotalTime}
                                        value={totalTime}

                                    />
                                    : <div className='time_count'>
                                        {recipe?.total_time}
                                    </div>}
                            </div>
                        </div>

                        {editActive ?
                            <div className='field-title'>Servings:
                                <input type='text'
                                    className='input servings_input'
                                    name='servings'
                                    // placeholder='2 - 4 servings | 16 pancakes'
                                    onChange={handleSetServingSize}
                                    value={servingSize}

                                />
                            </div>
                            : <div className='serving_size'>Servings: {recipe?.servings}</div>}


                        <div className='ingredients_label'>Ingredients </div>

                        {!editActive ? recipe?.ingredients.sort((a, b) => a.id - b.id).map(ingredient => (
                            <div key={ingredient.id} className='individual_ingredient_info'>
                                <BsDot />
                                <div className='ingredient_amount'>{ingredient.amount}&nbsp;</div>
                                <div className='ingredient_measurement'>{ingredient.measurement}&nbsp;</div>
                                <div className='ingredient_title'>{ingredient.title}</div>
                            </div>
                        )) :

                            inputFields?.map((ingredient, index) => (
                                <div key={index}>
                                    <label>A:</label>
                                    <input type='text'
                                        className='input amount-input'
                                        name='amount'
                                        placeholder='1 | 20 | 1/2 | (optional)'
                                        value={ingredient?.amount}
                                        onChange={e => handleChangeInput(index, e)}
                                    />
                                    <label>M:</label>
                                    <input type='text'
                                        className='input measurement-input'
                                        name='measurement'
                                        placeholder='cup | bunch | whole | (optional)'
                                        value={ingredient?.measurement}
                                        onChange={e => handleChangeInput(index, e)}
                                    />
                                    <label>I:</label>
                                    <input type='text'
                                        className='required-input input ingredient-input'
                                        name='title'
                                        placeholder='flour | eggs | milk'
                                        value={ingredient?.title}
                                        onChange={e => handleChangeInput(index, e)}
                                    />
                                    <BsDashSquare onClick={() => handleRemoveField(index)} />
                                    <BsPlusSquare onClick={handleAddField} />
                                </div>
                            ))

                        }
                    </div>
                </div>

                <div className='directions_block'>
                    <div className='directions_text'>
                        <div className='directions_label'>Directions: </div>
                        {editActive ?
                            <input type='text'
                                className='input directions_input'
                                name='directions'
                                placeholder='1. In a large bowl mix flour, eggs, and milk...'
                                onChange={handleSetDirectionsInp}
                                value={directionsInp}

                            /> :
                            recipe?.directions}
                    </div>
                </div>

                {deleteModal ?
                    <div className='opaque_container' onClick={handleDeleteModalClose} >

                        <div className='delete_modal'>
                            <div>Are you sure you want to delete your recipe?</div>
                            <div className='delete_modal_buttons'>
                                <button className='modal_button' type='button' onClick={handleDeleteModalClose}>No, Cancel</button>
                                <button className='modal_button' onClick={handleDelete}>Yes, Remove</button>
                            </div>
                        </div>
                    </div>
                    : null}

                {deleteIngredientModal ?
                    <div className='opaque_container' onClick={handleDeleteIngredientModalClose} >

                        <div className='delete_modal'>
                            <div>Are you sure you want to remove this ingredient?</div>
                            <div className='delete_modal_buttons'>
                                <button className='modal_button' type='button' onClick={handleDeleteIngredientModalClose}>No, Cancel</button>
                                <button className='modal_button' onClick={handleDeleteIngredient}>Yes, Remove</button>
                            </div>
                        </div>
                    </div>
                    : null}

                {showErrors ?
                    <div className='opaque_container' onClick={() => setShowErrors(false)} >

                        <div className='delete_modal'>
                            <div>You cannot update this recipe until these fields are filled in properly:</div>
                            <div className='error_block'>
                                {showErrors && <div>
                                    {validationErrors.map((error, ind) => (
                                        <div key={ind}>- {error}</div>
                                    ))}
                                </div>}
                                <button className='modal_button' type='button' onClick={() => setShowErrors(false)}>Close Window</button>
                            </div>
                        </div>
                    </div>
                    : null}
            </div>
        </form>
    );
};

export default IndividualRecipe;
